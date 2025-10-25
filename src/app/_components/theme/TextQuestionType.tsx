"use client";

import React, { useState } from "react";

interface TextQuestionTypeProps {
  label: string;
  placeholder?: string;
  onTextChange?: (text: string) => void;
  className?: string;
  multiline?: boolean;
  maxLength?: number;
}

export const TextQuestionType: React.FC<TextQuestionTypeProps> = ({
  label,
  placeholder = "Enter your response",
  onTextChange,
  className = "",
  multiline = true,
  maxLength,
}) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (value: string) => {
    setText(value);
    onTextChange?.(value);
  };

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className={className}>
      {/* Label */}
      <label className="mb-4 block text-base leading-tight font-normal text-[var(--color-text-white)]">
        {label}
      </label>

      {/* Text Input */}
      <div className="relative">
        <InputComponent
          type={multiline ? undefined : "text"}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full rounded-lg border bg-white/10 px-2 py-4 text-[var(--color-text-white)] transition-all duration-200 placeholder:text-[var(--color-text-muted)] hover:border-white/25 hover:bg-white/15 focus:border-[var(--color-accent-green)] focus:bg-white/15 focus:outline-none ${multiline ? "min-h-[120px] resize-y" : "h-14"} ${maxLength ? "pr-16" : ""} `}
          aria-label={label}
        />

        {/* Character count (if maxLength is provided) */}
        {maxLength && (
          <div className="absolute right-3 bottom-2 text-xs text-[var(--color-text-muted)]">
            {text.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Helper text for character limit */}
      {maxLength && (
        <div className="mt-2 text-xs text-[var(--color-text-muted)]">
          Maximum {maxLength} characters
        </div>
      )}
    </div>
  );
};
