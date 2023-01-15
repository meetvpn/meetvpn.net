import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage } from "@blitzjs/auth"
import { simpleRolesIsAuthorized } from "@blitzjs/auth"
import { BlitzLogger, BlitzServerMiddleware } from "blitz"
import db from "db"
import { authConfig } from "./blitz-client"

import cors from "cors"

const CORS = cors({
  origin: ["http://localhost", "capacitor://localhost", "https://meetvpn.net"],
  credentials: true,
})

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    BlitzServerMiddleware(CORS),
  ],
  logger: BlitzLogger({}),
})
