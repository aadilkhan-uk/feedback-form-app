"use client";

import { QuestionWrapper, RatingQuestionType, TextQuestionType } from "./theme";

interface QuestionRendererProps {
  question: {
    questionId: number;
    type: "rating" | "text";
    label: string;
    required: boolean;
  };
  questionNumber: number;
  isCompleted: boolean;
  onRatingChange: (questionId: number, rating: number) => void;
  onTextChange: (questionId: number, text: string) => void;
}

export function QuestionRenderer({
  question,
  questionNumber,
  isCompleted,
  onRatingChange,
  onTextChange,
}: QuestionRendererProps) {
  if (question.type === "rating") {
    return (
      <QuestionWrapper
        questionNumber={questionNumber}
        isCompleted={isCompleted}
        isRequired={question.required}
      >
        <RatingQuestionType
          label={question.label}
          onRatingChange={(rating) =>
            onRatingChange(question.questionId, rating)
          }
        />
      </QuestionWrapper>
    );
  }

  if (question.type === "text") {
    return (
      <QuestionWrapper
        questionNumber={questionNumber}
        isCompleted={isCompleted}
        isRequired={question.required}
      >
        <TextQuestionType
          className="flex-1"
          label={question.label}
          onTextChange={(text) => onTextChange(question.questionId, text)}
        />
      </QuestionWrapper>
    );
  }

  return null;
}
