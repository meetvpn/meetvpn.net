import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
// import db from "db"
import { z } from "zod"

import greetingsQueue from "src/pages/api/queues/greetingsQueue"

const GetServer = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetServer), resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const job = await greetingsQueue.enqueue({
    to: "Sandy Cheeks",
    message: "Howdy!",
  })

  if (!job) throw new NotFoundError()

  return job
})
