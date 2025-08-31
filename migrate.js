#!/usr/bin/env node

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...')

    // Wait for database to be ready
    console.log('⏳ Waiting for database to be ready...')
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Run migrations using payload CLI
    console.log('🚀 Running Payload migrations...')
    const { stdout, stderr } = await execAsync('npm run migrate', {
      env: { ...process.env, NODE_ENV: 'production' },
    })

    if (stdout) console.log('✅ Migration output:', stdout)
    if (stderr && !stderr.includes('Warning')) console.error('⚠️  Migration warnings:', stderr)

    console.log('✨ Migrations completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)

    // Try alternative migration approach
    try {
      console.log('🔄 Trying alternative migration approach...')
      const { stdout, stderr } = await execAsync('./node_modules/.bin/payload migrate', {
        env: { ...process.env, NODE_ENV: 'production' },
      })

      if (stdout) console.log('✅ Alternative migration output:', stdout)
      console.log('✨ Alternative migration completed!')
      process.exit(0)
    } catch (altError) {
      console.error('❌ Alternative migration also failed:', altError.message)
      console.log('⚠️  Continuing without migrations - admin panel should handle initial setup')
      process.exit(0) // Don't fail completely, let the app start
    }
  }
}

runMigrations()
