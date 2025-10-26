"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../trpc/react";

interface UseSubmitFeedbackProps {
  surveyId: string;
  responses: Record<number, string | number>;
  isComplete: boolean;
}

export function useSubmitFeedback({
  surveyId,
  responses,
  isComplete,
}: UseSubmitFeedbackProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitResponseMutation = api.survey.submitResponse.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      // Store the review in localStorage to pass to thank you page
      if (data.review) {
        localStorage.setItem("feedbackReview", data.review);
      }
      // Redirect to thank you page on successful submission
      router.push("/thank-you");
    },
    onError: (error) => {
      setIsSubmitting(false);
      alert(`Error submitting feedback: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    if (!isComplete) return;

    setIsSubmitting(true);

    const answers = Object.entries(responses).map(([questionId, response]) => ({
      questionId: parseInt(questionId),
      response,
    }));

    submitResponseMutation.mutate({
      surveyId,
      answers,
    });
  };

  return {
    isSubmitting,
    handleSubmit,
    canSubmit: isComplete && !isSubmitting,
  };
}
