import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteServer = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteServer),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const server = await db.server.deleteMany({ where: { id } });

    return server;
  }
);
