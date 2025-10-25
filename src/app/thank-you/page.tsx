"use client";

import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import { Button } from "../_components/theme";

export default function ThankYouPage() {
  return (
    <FeedbackFormLayout title="Thank You!">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        {/* Success Icon */}
        <div className="relative pb-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-accent-green)] shadow-[var(--color-accent-green)]/25 shadow-lg sm:h-32 sm:w-32">
            <svg
              className="h-12 w-12 text-white sm:h-16 sm:w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          {/* Floating decorative elements */}
          <div className="absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full bg-[var(--color-accent-pink)] sm:h-8 sm:w-8"></div>
          <div className="absolute -bottom-2 -left-2 h-4 w-4 animate-pulse rounded-full bg-[var(--color-accent-green)] sm:h-6 sm:w-6"></div>
        </div>

        {/* Main Message */}
        <div className="space-y-4 pt-10">
          <h2 className="text-2xl font-light tracking-wide text-[var(--color-text-white)] sm:text-3xl lg:text-4xl">
            Thank You for Your Feedback!
          </h2>
          <p className="text-lg text-[var(--color-text-light)] sm:text-xl">
            Your response has been successfully submitted and will help us
            improve our service.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex space-x-4 py-5">
          <div className="h-2 w-2 animate-ping rounded-full bg-[var(--color-accent-green)]"></div>
          <div
            className="h-2 w-2 animate-ping rounded-full bg-[var(--color-accent-pink)]"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 w-2 animate-ping rounded-full bg-[var(--color-accent-green)]"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Additional Info */}
        <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <svg
                className="h-6 w-6 text-[var(--color-accent-green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="pl-2 text-sm text-[var(--color-text-light)] sm:text-base">
                Your feedback is valuable to us
              </span>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-3">
              <svg
                className="h-6 w-6 text-[var(--color-accent-pink)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="pl-2 text-sm text-[var(--color-text-light)] sm:text-base">
                We appreciate your time and input
              </span>
            </div>
          </div>
        </div>

        {/* Fun decorative border */}
        <div className="flex w-full items-center space-x-2 pt-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent-green)] to-transparent"></div>
          <div className="h-2 w-2 rounded-full bg-[var(--color-accent-pink)]"></div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-accent-pink)] to-transparent"></div>
        </div>
      </div>
    </FeedbackFormLayout>
  );
}
