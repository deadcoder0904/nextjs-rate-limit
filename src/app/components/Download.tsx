'use client'

import { FormEvent } from 'react'

import { useStore } from '@/app/store/zustand'

export function Download() {
  const { fingerprint } = useStore()

  async function downloadFile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await fetch('/api/download', {
      method: 'POST',
      body: JSON.stringify({ fingerprint }),
    })
    const blob = await response.blob()
    const fileURL = window.URL.createObjectURL(blob)
    let anchor = document.createElement('a')
    anchor.href = fileURL
    anchor.download = `file.txt`
    anchor.click()
  }

  return (
    <div className="flex justify-center">
      <form
        className="bg-indigo-500 text-white w-36 rounded-md mt-24 text-center"
        onSubmit={downloadFile}
      >
        <button type="submit">Download file</button>
      </form>
    </div>
  )
}
