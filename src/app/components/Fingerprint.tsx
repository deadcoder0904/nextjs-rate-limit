'use client'

import React from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

import { useStore } from '@/app/store/zustand'

const isBrowser = () => typeof window !== undefined

export function Fingerprint() {
  const { setFingerprint } = useStore()

  React.useEffect(() => {
    async function fn() {
      if (isBrowser()) {
        const fp = await FingerprintJS.load()
        const { visitorId } = await fp.get()
        setFingerprint(visitorId)
      }
    }

    fn()
  }, [setFingerprint])
  return null
}
