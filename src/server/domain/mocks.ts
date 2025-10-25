import type { IReviewService, ISurveyRepo, IResponseRepo } from "./contracts";
import type { SurveyQuestionResponse } from "./types";

export const MockReviewService: IReviewService = {
  generateWrittenReview: async (answers: SurveyQuestionResponse[]) => {
    return "This is a mock generated review";
  },
};

export const MockSurveyRepo: ISurveyRepo = {
  getSurvey: async () => {
    return {
      surveyId: 1,
      title: "Choppaluna Feedback Form",
      questions: [
        {
          questionId: 1,
          label: "How do you feel about the product?",
          type: "rating",
        },
        {
          questionId: 2,
          label: "How was your service today?",
          type: "rating",
        },
        {
          questionId: 3,
          label: "How was your experience today?",
          type: "rating",
        },
        {
          questionId: 4,
          label: "What did you like about your service today?",
          type: "text",
        },
      ],
    };
  },
};

export const MockResponseRepo: IResponseRepo = {
  submitResponse: async (data: {
    surveyId: number;
    answers: SurveyQuestionResponse[];
  }) => {
    return { id: 1 };
  },
};
