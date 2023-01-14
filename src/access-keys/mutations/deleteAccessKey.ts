import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteAccessKey = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteAccessKey),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const accessKey = await db.accessKey.deleteMany({ where: { id } });

    return accessKey;
  }
);
