import fs from 'node:fs'
import { consola } from 'consola'

const LOCALHOST_URL = 'http://localhost:3000'

async function main() {
  for (let i = 0; i < 5; i++) {
    const url = `${LOCALHOST_URL}/api/download`
    const fingerprint = 'anon'
    const body = JSON.stringify({ fingerprint })

    const response = await fetch(url, {
      method: 'POST',
      body,
    })
    const buffer = await response.arrayBuffer()
    fs.writeFileSync(`file${i}.txt`, Buffer.from(buffer))
  }
  consola.box('Downloaded files successfully!')
}

main()
