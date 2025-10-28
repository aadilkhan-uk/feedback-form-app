import type { IReviewService, ISurveyRepo, IResponseRepo } from "./contracts";
import type { SurveyQuestionResponse, SubmissionWithAnswers } from "./types";

export const MockReviewService: IReviewService = {
  generateWrittenReview: async (answers: SurveyQuestionResponse[]) => {
    return "This is a mock generated review";
  },
};

export const MockSurveyRepo: ISurveyRepo = {
  getGoogleRedirects: async function (): Promise<{ count: number }> {
    return { count: 100 };
  },

  getSurvey: async () => {
    return {
      surveyId: "cmh6n4gvs0001bqhqz51kovhx",
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
    surveyId: string;
    answers: SurveyQuestionResponse[];
  }) => {
    return { id: 1 };
  },

  getTotalResponseCount: async () => {
    // Mock implementation - returns a dummy count with change percent
    return {
      count: 42,
      changePercent: 8.5,
    };
  },

  getResponsesByDateRange: async (params: {
    startDate: Date;
    endDate: Date;
  }) => {
    // Mock implementation - returns dummy responses
    const mockResponses: SubmissionWithAnswers[] = [
      {
        id: "1",
        surveyId: "cmh6n4gvs0001bqhqz51kovhx",
        createdAt: new Date(),
        answers: [
          {
            questionId: 1,
            questionLabel: "How do you feel about the product?",
            questionType: "rating",
            textValue: null,
            ratingValue: 5,
          },
          {
            questionId: 2,
            questionLabel: "How was your service today?",
            questionType: "rating",
            textValue: null,
            ratingValue: 4,
          },
          {
            questionId: 3,
            questionLabel: "How was your experience today?",
            questionType: "rating",
            textValue: null,
            ratingValue: 5,
          },
          {
            questionId: 4,
            questionLabel: "What did you like about your service today?",
            questionType: "text",
            textValue: "Great service and friendly staff!",
            ratingValue: null,
          },
        ],
      },
    ];

    return {
      count: mockResponses.length,
      responses: mockResponses,
    };
  },

  submitGoogleRedirect: async function (): Promise<{ success: boolean }> {
    return { success: true };
  },
};
