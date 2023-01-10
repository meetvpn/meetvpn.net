import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateAccessKey = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateAccessKey),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessKey = await db.accessKey.update({ where: { id }, data });

    return accessKey;
  }
);
