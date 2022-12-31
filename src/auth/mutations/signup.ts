import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"

import { customAlphabet } from "nanoid"

export default resolver.pipe(
  async () => {
    const referenceId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8)
    const key = customAlphabet("0123456789", 16)

    return { referenceId: referenceId(), key: key() }
  },
  async ({ referenceId, key }, ctx) => {
    const user = await db.user.create({
      data: {
        role: "USER",
        referenceId,
        account: { create: { key } },
      },
      select: { id: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
