import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db from "db"
import { Role } from "types"
import { Login } from "../validations"

export const authenticateUser = async (key: string) => {
  const account = await db.account.findFirst({
    where: { key: key.trim() },
    include: { user: true },
  })

  if (!account || !account.user) throw new AuthenticationError()

  return account.user
}

export default resolver.pipe(resolver.zod(Login), async ({ key }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(key)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
