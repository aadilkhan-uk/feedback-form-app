"use client";

import { useState, useEffect } from "react";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import { Button } from "../_components/theme";

export default function ThankYouPage() {
  const [review, setReview] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // Get the review from localStorage
    const storedReview = localStorage.getItem("feedbackReview");
    if (storedReview) {
      setReview(storedReview);
      // Clear it from localStorage after reading
      localStorage.removeItem("feedbackReview");
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLeaveOnGoogle = () => {
    const googleUrl =
      "https://www.google.com/search?sca_esv=d19d5628732e2c11&sxsrf=AE3TifOXI8zItOc-C2J5LAlMhtBd4ZNX1A:1761404218591&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E6sASdczsL_FYSeNII_tGaxhy8LNnDGutrI38Qzt45baZy-zfd5CqHA4-JSRoZL-1hwFWw77z-ZS5CdukfyBA2RpVKn5U0NhZ0yNRsHA0YlCxEPX2A%3D%3D&q=Choppaluna+-+Wembley+Reviews&sa=X&ved=2ahUKEwjA9YSGzr-QAxVsREEAHXwRLn0Q0bkNegQIIhAE&biw=1440&bih=778&dpr=2";
    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

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
        <div className="space-y-4 py-3">
          <h2 className="text-2xl font-light tracking-wide text-[var(--color-text-white)] sm:text-3xl lg:text-4xl">
            Thank You for Your Feedback!
          </h2>
          <p className="text-lg text-[var(--color-text-light)] sm:text-xl">
            Your response has been successfully submitted and will help us
            improve our service.
          </p>
        </div>

        {/* Review Textbox */}
        {review && (
          <div className="w-full max-w-2xl space-y-4">
            <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <label
                htmlFor="review-text"
                className="mb-3 block pb-3 text-sm font-medium text-[var(--color-text-light)]"
              >
                Your Generated Review:
              </label>
              <textarea
                id="review-text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="h-32 w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-[var(--color-text-light)] placeholder-[var(--color-text-muted)] transition-all duration-200 focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20 focus:outline-none"
                placeholder="Your review will appear here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row justify-center gap-3 pt-3">
              <Button
                onClick={handleCopy}
                className={`px-4 py-2 text-sm transition-all duration-300 ${
                  copySuccess
                    ? "scale-105 bg-[var(--color-accent-green)]"
                    : "hover:scale-105 hover:shadow-[var(--color-accent-pink)]/25 hover:shadow-lg"
                }`}
              >
                {copySuccess ? (
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4"
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
                    <span className="text-sm">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">Copy Review</span>
                  </div>
                )}
              </Button>

              <Button
                onClick={handleLeaveOnGoogle}
                className="bg-[var(--color-accent-green)] px-4 py-2 text-sm transition-all duration-300 hover:scale-105 hover:bg-[#5bc9a3] hover:shadow-[var(--color-accent-green)]/25 hover:shadow-lg"
              >
                <div className="flex items-center space-x-1">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm">Leave on Google</span>
                </div>
              </Button>
            </div>
          </div>
        )}

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
