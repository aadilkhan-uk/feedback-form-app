import { createTRPCRouter, publicProcedure } from "root/server/api/trpc";
import { z } from "zod";
import {
  MockReviewService,
  MockResponseRepo,
  MockSurveyRepo,
} from "root/server/domain/mocks";
import type { SurveyQuestionResponse } from "root/server/domain/types";

export const surveyRouter = createTRPCRouter({
  getSurvey: publicProcedure.query(async () => {
    return MockSurveyRepo.getSurvey();
  }),

  submitResponse: publicProcedure
    .input(
      z.object({
        surveyId: z.number(),
        answers: z.array(
          z.object({
            questionId: z.number(),
            response: z.string().or(z.number()),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      if (input.answers) {
        // Submit response to database
        const response = await MockResponseRepo.submitResponse({
          surveyId: input.surveyId,
          answers: input.answers,
        });

        // Generate written review based on feedback
        const review = await MockReviewService.generateWrittenReview(
          input.answers,
        );

        // Return response and review
        return {
          response,
          review,
        };
      }

      return {
        success: false,
        message: "No answers provided",
      };
    }),
});
