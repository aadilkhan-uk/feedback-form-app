"use client";

import { Card } from "./Card";

interface QuestionWrapperProps {
  children: React.ReactNode;
  questionNumber: number;
  isCompleted: boolean;
  isRequired?: boolean;
}

export function QuestionWrapper({
  children,
  questionNumber,
  isCompleted,
  isRequired = false,
}: QuestionWrapperProps) {
  return (
    <Card
      className={`mb-4 transition-all duration-300 ${
        isCompleted
          ? "border-[var(--color-accent-green)]/30 bg-white/8"
          : "border-white/10"
      }`}
    >
      <div className="mb-4">
        <div className="mb-3 flex items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              isCompleted
                ? "bg-[var(--color-accent-green)] text-white"
                : "bg-white/10 text-[var(--color-text-light)]"
            }`}
          >
            {questionNumber}
          </div>
          {isRequired && (
            <div className="flex items-center gap-1 text-sm">
              <span className="font-semibold text-[var(--color-accent-pink)]">
                *
              </span>
              <span className="text-[var(--color-text-light)]">Required</span>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
}
