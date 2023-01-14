import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateServer = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateServer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const server = await db.server.update({ where: { id }, data });
    // return server;
  }
)
