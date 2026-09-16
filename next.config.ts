import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['sharp', 'payload', '@payloadcms/db-postgres', '@prisma/client'],
  outputFileTracingIncludes: {
    '/*': [
      './payload.config.ts',
      './src/collections/**/*',
      './node_modules/sharp/**/*',
    ],
  },
}

export default withPayload(nextConfig)
