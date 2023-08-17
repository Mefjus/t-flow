import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const questionRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({
      include: {
        user: true,
      },
    });
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
          answers: {
            include: {
              user: true,
            },
            orderBy: {
              likes: "desc",
            },
          },
        },
      });
    }),
  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input: { text } }) => {
      const user = await ctx.prisma.user.findFirst();

      return ctx.prisma.question.create({
        data: {
          text,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    }),
});
