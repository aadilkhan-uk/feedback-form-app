"use client";

import React, { useState } from "react";

interface RatingQuestionTypeProps {
  label: string;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const RatingQuestionType: React.FC<RatingQuestionTypeProps> = ({
  label,
  onRatingChange,
  className = "",
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Rating scale: 1-7, then 10 (skipping 8-9 as shown in wireframe)
  const ratingOptions = [1, 2, 3, 4, 5];

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange?.(rating);
  };

  return (
    <div className={className}>
      {/* Label */}
      <label className="mb-4 block text-base leading-tight font-normal text-[var(--color-text-white)]">
        {label}
      </label>

      {/* Rating Buttons */}
      <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
        {ratingOptions.map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingClick(rating)}
            className={`relative flex h-12 w-12 items-center justify-center rounded-lg border-2 text-base font-semibold transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[var(--color-accent-green)] focus:ring-offset-2 focus:ring-offset-[var(--color-primary-bg)] focus:outline-none active:scale-95 sm:h-14 sm:w-14 sm:text-lg ${
              selectedRating === rating
                ? "border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-[var(--color-text-white)] shadow-[var(--color-accent-green)]/25 shadow-lg"
                : "border-white/20 bg-white/10 text-[var(--color-text-light)] hover:border-white/30 hover:bg-white/15"
            } `}
            aria-label={`Rate ${rating}`}
            role="radio"
            aria-checked={selectedRating === rating}
          >
            {rating}
          </button>
        ))}
      </div>

      {/* Rating Labels (Mobile-first, hidden on larger screens to reduce clutter) */}
      <div
        className="flex justify-between text-xs text-[var(--color-text-muted)] sm:hidden"
        style={{ width: "calc(5 * 3rem + 4 * 0.5rem)" }}
      >
        <span>Poor</span>
        <span>Excellent</span>
      </div>
    </div>
  );
};
