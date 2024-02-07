import consola from 'consola'

import { redis } from '@/app/lib/redis/client'

async function main() {
  const keys = await redis.keys('*')

  consola.info(`Total Keys: ${keys.length}`)

  for await (const key of keys) {
    consola.success('Key', key)
    const value = await redis.get(key)
    consola.success('Value', value)
  }

  consola.box('Got all keys!')
  process.exit()
}

main()
