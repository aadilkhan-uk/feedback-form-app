import { createTRPCRouter, publicProcedure } from "root/server/api/trpc";
import { z } from "zod";
import { SurveyRepo } from "root/server/services/SurveyRepo";
import type { SurveyQuestionResponse } from "root/server/domain/types";
import { ResponseRepo } from "root/server/services/ResponseRepo";
import { ReviewService } from "root/server/services/ReviewService";

export const surveyRouter = createTRPCRouter({
  /**
   * Retrieves the current survey with all its questions.
   * This endpoint returns the survey configuration for clients to display to users.
   *
   * @returns {Promise<Survey>} The survey object containing surveyId, title, and questions.
   */
  getSurvey: publicProcedure.query(async () => {
    return SurveyRepo.getSurvey();
  }),

  /**
   * Submits a response to the current survey.
   * This endpoint accepts survey answers from the user, stores them,
   * and generates a written review based on the submitted feedback.
   *
   * Input:
   *   - surveyId: number (ID of the survey being answered)
   *   - answers: Array of objects, each with:
   *       - questionId: number (ID of the question)
   *       - response: string or number (user's answer)
   *
   * Returns:
   *   - If answers are provided:
   *       - response: The submitted response object (e.g., database ID)
   *       - review: The generated written review as a string
   *   - If no answers are provided:
   *       - success: false
   *       - message: "No answers provided"
   */
  submitResponse: publicProcedure
    .input(
      z.object({
        surveyId: z.string(),
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
        const response = await ResponseRepo.submitResponse({
          surveyId: input.surveyId,
          answers: input.answers,
        });

        // Generate written review based on feedback
        const review = await ReviewService.generateWrittenReview(input.answers);

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
