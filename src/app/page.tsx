import Link from "next/link";

import { LatestPost } from "root/app/_components/post";
import { auth } from "root/server/auth";
import { api, HydrateClient } from "root/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main>
        <h1>Survey</h1>
        <p>This is a survey</p>
      </main>
    </HydrateClient>
  );
}
