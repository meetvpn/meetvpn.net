import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getServers from "src/servers/queries/getServers";

const ITEMS_PER_PAGE = 100;

export const ServersList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ servers, hasMore }] = usePaginatedQuery(getServers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {servers.map((server) => (
          <li key={server.id}>
            <Link href={Routes.ShowServerPage({ serverId: server.id })}>
              <a>{server.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ServersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Servers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewServerPage()}>
            <a>Create Server</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ServersList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ServersPage;
