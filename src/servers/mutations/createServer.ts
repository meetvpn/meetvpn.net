import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateServer = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateServer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const server = await db.server.create({ data: input });
  // return server;
})
