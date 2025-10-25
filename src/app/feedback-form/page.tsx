"use client";

import { useState } from "react";
import { useSurvey } from "../../hooks/useSurvey";
import { LoadingState, ErrorState, SurveyDebug } from "../_components";
import { FeedbackFormLayout } from "../_components/layouts/FeedbackFormLayout";
import {
  Button,
  RatingQuestionType,
  TextQuestionType,
} from "../_components/theme";

export default function FeedbackFormPage() {
  const { survey, isLoading, error } = useSurvey();
  const [formResponses, setFormResponses] = useState<
    Record<string, string | number>
  >({});

  const handleRatingChange = (questionKey: string, rating: number) => {
    setFormResponses((prev) => ({
      ...prev,
      [questionKey]: rating,
    }));
  };

  const handleTextChange = (questionKey: string, text: string) => {
    setFormResponses((prev) => ({
      ...prev,
      [questionKey]: text,
    }));
  };

  if (isLoading) {
    return (
      <FeedbackFormLayout>
        <LoadingState />
      </FeedbackFormLayout>
    );
  }

  if (error) {
    return (
      <FeedbackFormLayout>
        <ErrorState error={error} />
      </FeedbackFormLayout>
    );
  }

  if (!survey) {
    return (
      <FeedbackFormLayout>
        <ErrorState error={{ message: "No survey data available" }} />
      </FeedbackFormLayout>
    );
  }

  return (
    <FeedbackFormLayout title={survey.title}>
      <div className="space-y-8">
        {survey.questions.map((question) => {
          if (question.type === "rating") {
            return (
              <div key={question.key} className="pb-6">
                <RatingQuestionType
                  key={question.key}
                  label={question.label}
                  onRatingChange={(rating) =>
                    handleRatingChange(question.key, rating)
                  }
                />
              </div>
            );
          }

          if (question.type === "text") {
            return (
              <div key={question.key} className="pb-6">
                <TextQuestionType
                  key={question.key}
                  className="mb-6"
                  label={question.label}
                  onTextChange={(text) => handleTextChange(question.key, text)}
                />
              </div>
            );
          }

          return null;
        })}
        <Button>Submit</Button>
      </div>
    </FeedbackFormLayout>
  );
}
