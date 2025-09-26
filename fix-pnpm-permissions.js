/* eslint-disable @typescript-eslint/no-require-imports */
// Windows permission fixer for pnpm
const fs = require('fs')
const path = require('path')

// Define the node_modules directory
const nodeModulesDir = path.join(__dirname, 'node_modules')

console.log('Checking if node_modules directory exists...')
if (!fs.existsSync(nodeModulesDir)) {
  console.log('node_modules directory does not exist, nothing to fix.')
  process.exit(0)
}

// Function to fix permissions for a directory
function fixPermissions(dir) {
  try {
    console.log(`Processing: ${dir}`)
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name)
      try {
        if (entry.isDirectory()) {
          // First try to fix permissions for directories containing '_tmp_'
          if (entry.name.includes('_tmp_')) {
            try {
              console.log(`Found temp directory: ${fullPath}, attempting to remove...`)
              fs.rmSync(fullPath, { recursive: true, force: true })
              console.log(`Successfully removed: ${fullPath}`)
            } catch (err) {
              console.log(`Could not remove temp directory: ${fullPath}, error: ${err.message}`)
            }
          } else {
            // Continue recursively for other directories
            fixPermissions(fullPath)
          }
        }
      } catch (err) {
        console.log(`Error processing ${fullPath}: ${err.message}`)
      }
    })
  } catch (err) {
    console.log(`Error accessing directory ${dir}: ${err.message}`)
  }
}

console.log('Starting permission fix for node_modules...')
fixPermissions(nodeModulesDir)
console.log('Completed permission fix. Now you can try running pnpm install again.')
