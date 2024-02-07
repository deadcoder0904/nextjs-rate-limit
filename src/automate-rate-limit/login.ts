import { consola } from 'consola'
const LOCALHOST_URL = 'http://localhost:3000'

async function main() {
  for (let i = 0; i < 50; i++) {
    const url = `${LOCALHOST_URL}/api/login`
    const email = `test${i}@example.com`
    const fingerprint = 'anon'
    const body = JSON.stringify({ email, fingerprint })

    const response = await fetch(url, {
      method: 'POST',
      body,
    })
    const data = await response.json()

    consola.info({ data })
  }
}

main()
