import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateAccessKey = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateAccessKey), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const accessKey = await db.accessKey.create({ data: input });
  // return accessKey;
})
