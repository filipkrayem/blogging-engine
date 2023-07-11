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

  getDrafts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { published: false },
      include: { author: true, comments: true },
    });
  }),
});
