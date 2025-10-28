import type {
  Survey,
  SubmissionWithAnswers,
  SurveyQuestionResponse,
} from "./types";

export interface IReviewService {
  generateWrittenReview(answers: SurveyQuestionResponse[]): Promise<string>;
}

export interface ISurveyRepo {
  getSurvey(): Promise<Survey | null>;
  getGoogleRedirects(): Promise<{ count: number }>;
}

export interface IResponseRepo {
  submitResponse(data: {
    surveyId: string;
    answers: SurveyQuestionResponse[];
  }): Promise<{ id: number }>;

  getTotalResponseCount(): Promise<{
    count: number;
    changePercent: number | null;
  }>;

  submitGoogleRedirect(): Promise<{ success: boolean }>;

  getResponsesByDateRange(params: { startDate: Date; endDate: Date }): Promise<{
    count: number;
    responses: SubmissionWithAnswers[];
  }>;
}
