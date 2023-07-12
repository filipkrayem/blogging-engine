import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        // page: z.number().default(1),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { postId: input.postId },
        take: 100,
        // skip: (input.page - 1) * 10,
        orderBy: {
          created_at: "desc",
        },
        include: {
          author: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          authorId: ctx.session.user.id,
          postId: input.postId,
        },
      });
    }),

  vote: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        postId: z.string(),
        vote: z.enum(["increment", "decrement"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.update({
        where: { id: input.commentId },
        data: {
          upvotes: {
            [input.vote]: 1,
          },
        },
      });
    }),
});
