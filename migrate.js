#!/usr/bin/env node

import { exec } from 'child_process'
import { promisify } from 'util'
import { existsSync } from 'fs'

const execAsync = promisify(exec)

async function checkDatabase() {
  console.log('🔍 Checking database connection...')
  const maxRetries = 30

  for (let i = 0; i < maxRetries; i++) {
    try {
      await execAsync(
        "node -e \"const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URI }); pool.query('SELECT 1').then(() => { console.log('DB OK'); process.exit(0) }).catch(() => process.exit(1))\"",
      )
      console.log('✅ Database is ready!')
      return true
    } catch (error) {
      console.log(`⏳ Waiting for database... attempt ${i + 1}/${maxRetries}`)
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  throw new Error('Database not ready after maximum retries')
}

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...')

    // Check if database is ready
    await checkDatabase()

    // Check if migration files exist
    const migrationPath = './src/migrations'
    if (!existsSync(migrationPath)) {
      console.log('⚠️  No migration directory found - skipping migrations')
      return
    }

    // Run migrations using payload CLI
    console.log('🚀 Running Payload migrations...')
    const { stdout, stderr } = await execAsync('node_modules/.bin/payload migrate', {
      env: { ...process.env, NODE_ENV: 'production' },
      cwd: process.cwd(),
    })

    if (stdout) console.log('✅ Migration output:', stdout)
    if (stderr && !stderr.includes('Warning') && !stderr.includes('INFO')) {
      console.error('⚠️  Migration warnings:', stderr)
    }

    console.log('✨ Migrations completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)

    // Try to check if tables already exist
    try {
      console.log('� Checking if tables already exist...')
      await execAsync(
        "node -e \"const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URI }); pool.query('SELECT * FROM posts LIMIT 1').then(() => { console.log('Tables exist'); process.exit(0) }).catch(() => process.exit(1))\"",
      )
      console.log('✅ Database tables already exist, continuing...')
      process.exit(0)
    } catch (tableError) {
      console.log(
        '⚠️  Tables do not exist, but continuing anyway - Payload will handle schema creation',
      )
      process.exit(0) // Don't fail completely, let the app start
    }
  }
}

runMigrations()
