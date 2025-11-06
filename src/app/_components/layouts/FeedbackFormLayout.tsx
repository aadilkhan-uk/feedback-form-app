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
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col pt-4 pb-4 md:pt-12 md:pb-8">
        {/* Main Content Area */}
        <section className="flex-1 px-4 py-3 sm:px-6 md:py-6 lg:px-8">
          {children}
        </section>

        {/* Footer spacing */}
        <div className="mt-auto">
          <p className="text-center text-xs text-[var(--color-text-muted)] md:text-sm">
            Powered by Tekva Solutions
          </p>
          <p className="text-center text-xs text-[var(--color-text-muted)] md:text-sm">
            Copyright 2025
          </p>
        </div>
      </div>
    </main>
  );
}
