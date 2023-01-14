import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetAccessKeysInput
  extends Pick<
    Prisma.AccessKeyFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAccessKeysInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: accessKeys,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.accessKey.count({ where }),
      query: (paginateArgs) =>
        db.accessKey.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      accessKeys,
      nextPage,
      hasMore,
      count,
    };
  }
);
