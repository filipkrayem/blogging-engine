import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getPublished: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { published: true },
      include: { author: true, comments: true },
    });
  }),

  getDrafts: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.post.findMany({
      where: { published: false, authorId: userId },
      include: { author: true, comments: true },
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findUnique({
      where: { id: input },
      include: { author: true, comments: true },
    });
  }),
});
