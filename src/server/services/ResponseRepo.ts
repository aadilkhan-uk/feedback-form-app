import { db } from "../db";
import type { IResponseRepo } from "../domain/contracts";
import type { SurveyQuestionResponse } from "../domain/types";

const HARDCODED_SURVEY_DB_ID = "cmh6n4gvs0001bqhqz51kovhx";

export const ResponseRepo: IResponseRepo = {
  submitResponse: async (data: {
    surveyId: string;
    answers: SurveyQuestionResponse[];
  }) => {
    // Fetch survey to get the actual question IDs
    const survey = await db.survey.findUnique({
      where: { id: HARDCODED_SURVEY_DB_ID },
      include: {
        questions: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!survey) {
      throw new Error("Survey not found");
    }

    // Create submission
    const submission = await db.submission.create({
      data: {
        surveyId: HARDCODED_SURVEY_DB_ID,
      },
    });

    // Map numeric questionIds to database question IDs
    // questionId is 1-indexed based on sortOrder (questionId = index + 1)
    const questionIdMap = new Map(
      survey.questions.map((q: { id: string }, index: number) => [
        index + 1,
        q.id,
      ]),
    );

    // Create answers for each response
    const answers = await Promise.all(
      data.answers.map(async (answer) => {
        const dbQuestionId = questionIdMap.get(answer.questionId);
        if (!dbQuestionId) {
          throw new Error(`Question ${answer.questionId} not found`);
        }

        // Determine if it's a text or rating value
        const isText = typeof answer.response === "string";
        const isRating = typeof answer.response === "number";

        return db.answer.create({
          data: {
            submissionId: submission.id,
            questionId: dbQuestionId,
            textValue: isText ? answer.response : null,
            ratingValue: isRating ? answer.response : null,
          },
        });
      }),
    );

    return { id: 1 };
  },
};
