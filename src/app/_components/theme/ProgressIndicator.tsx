"use client";

import { Card } from "./Card";

interface ProgressIndicatorProps {
  completedQuestions: number;
  totalQuestions: number;
}

export function ProgressIndicator({
  completedQuestions,
  totalQuestions,
}: ProgressIndicatorProps) {
  const progressPercentage = (completedQuestions / totalQuestions) * 100;
  const isComplete = completedQuestions === totalQuestions;

  return (
    <Card className="mb-8">
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm text-[var(--color-text-light)]">
          <span className="font-medium">Progress</span>
          <span
            className={`transition-all duration-300 ${isComplete ? "inline-block scale-105 font-semibold text-[var(--color-accent-green)]" : ""}`}
          >
            {completedQuestions}/{totalQuestions} completed
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              isComplete
                ? "animate-[shimmer_2s_ease-in-out_infinite] bg-[var(--color-accent-green)]"
                : "bg-[var(--color-accent-green)]"
            }`}
            style={{
              width: `${progressPercentage}%`,
              background: isComplete
                ? "linear-gradient(90deg, var(--color-accent-green), var(--color-accent-pink), var(--color-accent-green))"
                : "var(--color-accent-green)",
              backgroundSize: isComplete ? "200% 100%" : "100% 100%",
            }}
          />
        </div>
      </div>
    </Card>
  );
}
