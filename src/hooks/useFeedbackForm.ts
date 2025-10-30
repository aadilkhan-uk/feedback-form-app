"use client";

import { useState, useCallback, useMemo } from "react";

interface Question {
  questionId: number;
  required: boolean;
}

interface FormState {
  responses: Record<number, string | number>;
  completedQuestions: number;
  totalQuestions: number;
  isComplete: boolean;
}

interface UseFeedbackFormProps {
  questions: Question[];
}

export function useFeedbackForm({ questions }: UseFeedbackFormProps) {
  const [responses, setResponses] = useState<Record<number, string | number>>(
    {},
  );

  const updateResponse = useCallback(
    (questionId: number, value: string | number) => {
      setResponses((prev) => ({
        ...prev,
        [questionId]: value,
      }));
    },
    [],
  );

  const { requiredQuestions, totalRequiredQuestions } = useMemo(() => {
    const required = questions.filter((q) => q.required);
    return {
      requiredQuestions: required,
      totalRequiredQuestions: required.length,
    };
  }, [questions]);

  // Count completed required questions for progress
  const completedRequiredQuestions = useMemo(() => {
    return requiredQuestions.filter(
      (q) => responses[q.questionId] !== undefined,
    ).length;
  }, [requiredQuestions, responses]);

  // Check if all required questions are answered
  const isComplete = useMemo(() => {
    return requiredQuestions.every(
      (q) => responses[q.questionId] !== undefined,
    );
  }, [requiredQuestions, responses]);

  const formState: FormState = {
    responses,
    completedQuestions: completedRequiredQuestions,
    totalQuestions: totalRequiredQuestions,
    isComplete,
  };

  return {
    formState,
    updateResponse,
  };
}
