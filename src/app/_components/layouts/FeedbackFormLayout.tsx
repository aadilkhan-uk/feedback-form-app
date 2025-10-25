import { type ReactNode } from "react";

interface FeedbackFormLayoutProps {
  children: ReactNode;
  title?: string;
}

export function FeedbackFormLayout({
  children,
  title = "Choppaluna Feedback Form",
}: FeedbackFormLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col pt-16 pb-8">
        {/* Header Section */}
        <header className="px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </section>

        {/* Footer spacing */}
        <div className="mt-auto">
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Powered by Tekva Solutions
          </p>
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Copyright 2025
          </p>
        </div>
      </div>
    </main>
  );
}
