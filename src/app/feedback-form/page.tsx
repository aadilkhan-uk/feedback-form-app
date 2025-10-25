"use client";

import {
  Button,
  RatingQuestionType,
  TextQuestionType,
} from "../_components/theme";

export default function FeedbackFormPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Mobile-first skeleton layout */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col pt-16 pb-8">
        {/* Header Section */}
        <header className="px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-light tracking-wide sm:text-4xl lg:text-5xl">
            Choppaluna Feedback Form
          </h1>
        </header>

        {/* Main Content Area */}
        <section className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <RatingQuestionType
              label="Rate your experience:"
              onRatingChange={(rating: number) =>
                console.log("Selected rating:", rating)
              }
            />
            <TextQuestionType
              label="What could be improved?"
              placeholder="Enter your response"
              multiline={true}
              onTextChange={(text: string) => console.log("Text:", text)}
            />
            <Button>Submit</Button>
          </div>
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
