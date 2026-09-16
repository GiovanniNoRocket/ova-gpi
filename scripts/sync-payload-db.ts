import 'dotenv/config'
import { enableNonInteractiveMode } from './non-interactive.ts'

enableNonInteractiveMode()

import config from '../payload.config.js'
import { getPayload } from 'payload'

async function main() {
  console.log('Syncing Payload schema to database...')
  const payload = await getPayload({ config })
  await payload.db?.destroy?.()
  console.log('Payload schema synced.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
