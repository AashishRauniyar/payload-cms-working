#!/usr/bin/env node
/**
 * Node.js Health Check Script
 * Can be run locally without Docker to check public endpoints
 *
 * Usage: node health-check.js [domain]
 */

import https from 'https'
import http from 'http'
import dns from 'dns'
const dnsPromises = dns.promises

// Configuration
const DOMAIN = process.argv[2] || 'healthylifestyletips.online'
const WWW_DOMAIN = `www.${DOMAIN}`
const HEALTH_PATH = '/api/health'
const TIMEOUT = 10000

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
}

function logSection(title) {
  console.log('')
  console.log('━'.repeat(50))
  console.log(`${colors.cyan}📋 ${title}${colors.reset}`)
  console.log('━'.repeat(50))
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`)
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`)
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`)
}

function httpRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const request = protocol.request(url, options, (response) => {
      let data = ''
      response.on('data', (chunk) => (data += chunk))
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: data,
        })
      })
    })

    request.on('error', reject)
    request.on('timeout', () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })

    request.setTimeout(TIMEOUT)
    request.end()
  })
}

async function checkDNS(domain) {
  try {
    const addresses = await dnsPromises.resolve4(domain)
    return addresses
  } catch (error) {
    logError(`${domain}: ${error.message}`)
    return null
  }
}

async function checkHealthEndpoint(domain) {
  const url = `https://${domain}${HEALTH_PATH}`

  try {
    console.log(`Testing: ${url}`)
    const response = await httpRequest(url, {
      rejectUnauthorized: false, // Skip SSL verification for testing
    })

    if (response.statusCode === 200) {
      logSuccess(`Health endpoint accessible (Status: ${response.statusCode})`)
      try {
        const data = JSON.parse(response.body)
        console.log('Response:', JSON.stringify(data, null, 2))

        // Check for expected fields
        if (data.status === 'ok') {
          logSuccess('Health status: OK')
        } else {
          logWarning(`Unexpected status: ${data.status}`)
        }
      } catch (error) {
        logWarning('Response is not valid JSON')
        console.log('Response body:', response.body.substring(0, 200))
      }
    } else {
      logError(`Health endpoint returned status: ${response.statusCode}`)
    }
  } catch (error) {
    logError(`Health check failed: ${error.message}`)
  }
}

async function checkTLS(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      method: 'GET',
      rejectUnauthorized: false,
    }

    const req = https.request(options, (res) => {
      console.log(`TLS Protocol: ${res.connection.getProtocol()}`)
      console.log(`TLS Cipher: ${res.connection.getCipher()?.name}`)

      const cert = res.connection.getPeerCertificate()
      console.log(`Certificate Subject: ${cert.subject?.CN}`)
      console.log(`Certificate Issuer: ${cert.issuer?.CN}`)
      console.log(`Certificate Valid From: ${cert.valid_from}`)
      console.log(`Certificate Valid To: ${cert.valid_to}`)

      // Check if certificate is expired
      const now = new Date()
      const validTo = new Date(cert.valid_to)
      if (validTo > now) {
        logSuccess('Certificate is valid')
      } else {
        logError('Certificate is expired')
      }

      resolve()
    })

    req.on('error', (error) => {
      logError(`TLS check failed: ${error.message}`)
      resolve()
    })

    req.end()
  })
}

async function checkRootUrl(domain) {
  try {
    const response = await httpRequest(`https://${domain}/`, {
      rejectUnauthorized: false,
      timeout: TIMEOUT,
    })

    if (response.statusCode === 200) {
      logSuccess(`Root URL accessible (Status: ${response.statusCode})`)
    } else {
      logWarning(`Root URL returned status: ${response.statusCode}`)
    }
  } catch (error) {
    logError(`Root URL check failed: ${error.message}`)
  }
}

async function main() {
  console.log('==========================================')
  console.log(`${colors.cyan}🔍 Public Health Check Diagnostics${colors.reset}`)
  console.log('==========================================')
  console.log(`Domain: ${DOMAIN}`)
  console.log(`WWW Domain: ${WWW_DOMAIN}`)
  console.log(`Health Path: ${HEALTH_PATH}`)
  console.log('==========================================')

  // 1. DNS Resolution
  logSection('1. DNS Resolution')

  console.log(`Primary domain (${DOMAIN}):`)
  const primaryIPs = await checkDNS(DOMAIN)
  if (primaryIPs) {
    logSuccess(`Resolves to: ${primaryIPs.join(', ')}`)
  }

  console.log(`\nWWW domain (${WWW_DOMAIN}):`)
  const wwwIPs = await checkDNS(WWW_DOMAIN)
  if (wwwIPs) {
    logSuccess(`Resolves to: ${wwwIPs.join(', ')}`)
  }

  // 2. Root URL Check
  logSection('2. Root URL Check')
  await checkRootUrl(DOMAIN)

  // 3. Health Endpoint Check (Primary Domain)
  logSection('3. Health Endpoint Check (Primary Domain)')
  await checkHealthEndpoint(DOMAIN)

  // 4. Health Endpoint Check (WWW Domain)
  logSection('4. Health Endpoint Check (WWW Domain)')
  await checkHealthEndpoint(WWW_DOMAIN)

  // 5. TLS/SSL Check
  logSection('5. TLS/SSL Certificate Check')
  await checkTLS(DOMAIN)

  // 6. Summary
  logSection('Summary')
  console.log('✅ Public health check completed\n')
  console.log(`${colors.yellow}🔍 What to look for:${colors.reset}`)
  console.log('  • DNS resolves to correct IP')
  console.log('  • Health endpoint returns 200 OK')
  console.log('  • Certificate is valid and not expired')
  console.log('  • Response contains expected data')
  console.log('')
  console.log('📚 For more detailed diagnostics, run:')
  console.log('  • Linux/macOS: ./health-check.sh')
  console.log('  • Windows:     .\\health-check.ps1')
  console.log('  • Quick:       ./health-check-quick.sh')
}

// Run the checks
main().catch((error) => {
  logError(`Fatal error: ${error.message}`)
  process.exit(1)
})
