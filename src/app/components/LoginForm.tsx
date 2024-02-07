'use client'

import { FormEvent, useState } from 'react'

import { useStore } from '@/app/store/zustand'

export function LoginForm() {
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const { fingerprint } = useStore()

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ fingerprint, email }),
    })
    const { success } = await res.json()
    if (success) {
      setSuccess(true)
      alert('Login successful!')
    }
  }

  return (
    <>
      <form
        className="flex justify-center items-center mt-64"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="px-2 bg-orange-400">
          login
        </button>
      </form>
      <div className="flex justify-center">
        {!(email.trim() === '' || success) && (
          <p className="text-red-500">invalid email address. try again!!!</p>
        )}
      </div>
    </>
  )
}
