import Link from "next/link";

import { LatestPost } from "root/app/_components/post";
import { auth } from "root/server/auth";
import { api, HydrateClient } from "root/trpc/server";
import { Button, Banner, Card, Footer } from "root/app/_components/theme";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-16">
            <div>
              <h1>Choppaluna.</h1>
              <p className="text-center">Feedback Form</p>
            </div>
            <div>
              <p className="text-center text-[20px] text-gray-100">
                Powered by Tekva Solutions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
