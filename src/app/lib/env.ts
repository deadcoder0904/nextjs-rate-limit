import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

// see https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    REDIS_URL: z.string().min(1),
  },
  client: {
    /*can be left empty or add the client-side variables*/
  },
  experimental__runtimeEnv: {},
})
