"use client";

import { RatingQuestionType } from "../_components/theme";

export default function FeedbackFormPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Mobile-first skeleton layout */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col pt-16 pb-8">
        {/* Header Section */}
        <header className="mb-8 px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">
            Feedback
          </h1>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <RatingQuestionType
            label="Rate your experience:"
            onRatingChange={(rating: number) =>
              console.log("Selected rating:", rating)
            }
          />
        </section>

        {/* Footer spacing */}
        <div className="mt-auto"></div>
      </div>
    </main>
  );
}
