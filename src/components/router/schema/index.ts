import { z } from 'zod'

export const RouteConfigSchema = z.object({
  name: z.string().min(1),
  path: z.string().startsWith('/'),
  protected: z.enum(['private', 'guest-only']),
  permissions: z.array(z.string()).optional(),
})
