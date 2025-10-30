import { auth } from "root/server/auth";
import { HydrateClient } from "root/trpc/server";

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
