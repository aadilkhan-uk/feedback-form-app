import { ResponseRepo } from "root/server/services/ResponseRepo";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const surveyRouter = createTRPCRouter({
  getTotalResponseCount: publicProcedure.query(async () => {
    return ResponseRepo.getTotalResponseCount();
  }),

  getResponsesByDateRange: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ input }) => {
      return ResponseRepo.getResponsesByDateRange(input);
    }),
});
