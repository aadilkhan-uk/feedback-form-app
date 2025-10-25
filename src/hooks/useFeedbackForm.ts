"use client";

import { useState, useCallback } from "react";

interface FormState {
  responses: Record<number, string | number>;
  completedQuestions: number;
  totalQuestions: number;
  isComplete: boolean;
}

interface UseFeedbackFormProps {
  totalQuestions: number;
}

export function useFeedbackForm({ totalQuestions }: UseFeedbackFormProps) {
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

  const completedQuestions = Object.keys(responses).length;
  const isComplete = completedQuestions === totalQuestions;

  const formState: FormState = {
    responses,
    completedQuestions,
    totalQuestions,
    isComplete,
  };

  return {
    formState,
    updateResponse,
  };
}
