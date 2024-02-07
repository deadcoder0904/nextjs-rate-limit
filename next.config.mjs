import jiti from 'jiti'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const envPath = './src/app/lib/env'

jiti(filename)(envPath)

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
