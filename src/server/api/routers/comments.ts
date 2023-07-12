import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        page: z.number().default(1),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { postId: input.postId },
        take: 10,
        skip: (input.page - 1) * 10,
        include: {
          author: true,
        },
      });
    }),
});
