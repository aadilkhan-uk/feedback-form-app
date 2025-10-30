export type QuestionType = "rating" | "text";

export interface SurveyQuestion {
  questionId: number;
  label: string;
  type: QuestionType;
  required: boolean;
}

export interface Survey {
  surveyId: string;
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveyQuestionResponse {
  questionId: number;
  response: string | number;
}

export interface SurveyResponse {
  surveyId: string;
  responses: SurveyQuestionResponse[];
}

export interface AnswerData {
  questionId: number;
  questionLabel: string;
  questionType: QuestionType;
  textValue: string | null;
  ratingValue: number | null;
}

export interface SubmissionWithAnswers {
  id: string;
  surveyId: string;
  createdAt: Date;
  answers: AnswerData[];
}
