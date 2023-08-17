import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const answerRouter = router({
  addLike: publicProcedure
    .input(z.object({ answerId: z.string() }))
    .mutation(async ({ ctx, input: { answerId } }) => {
      return ctx.prisma.answer.update({
        where: { id: answerId },
        data: { likes: { increment: 1 } },
      });
    }),
  addDislike: publicProcedure
    .input(z.object({ answerId: z.string() }))
    .mutation(async ({ ctx, input: { answerId } }) => {
      return ctx.prisma.answer.update({
        where: { id: answerId },
        data: { dislikes: { increment: 1 } },
      });
    }),
  addEcolike: publicProcedure
    .input(z.object({ answerId: z.string() }))
    .mutation(async ({ ctx, input: { answerId } }) => {
      return ctx.prisma.answer.update({
        where: { id: answerId },
        data: { ekolikes: { increment: 1 } },
      });
    }),
  add: publicProcedure
    .input(z.object({ text: z.string(), questionId: z.string() }))
    .mutation(async ({ ctx, input: { text, questionId } }) => {
      const user = await ctx.prisma.user.findFirst();

      return ctx.prisma.answer.create({
        data: {
          text,
          user: {
            connect: {
              id: user?.id,
            },
          },
          question: {
            connect: {
              id: questionId,
            },
          },
        },
      });
    }),
});
