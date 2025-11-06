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
    <Card className="mb-3 md:mb-6">
      <div className="mb-2 md:mb-3">
        <div className="mb-1 flex justify-between text-xs text-[var(--color-text-light)] md:mb-2 md:text-sm">
          <span className="font-medium">Progress</span>
          <span
            className={`transition-all duration-300 ${isComplete ? "inline-block scale-105 font-semibold text-[var(--color-accent-green)]" : ""}`}
          >
            {completedQuestions}/{totalQuestions} completed
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 md:h-2">
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ease-out md:h-2 ${
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
