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
      orderBy: { created_at: "desc" },
      include: {
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }),

  getDrafts: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.post.findMany({
      where: { published: false, authorId: userId },
      include: {
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }),

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.post.findUnique({
      where: { id: input },
      include: {
        author: true,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), imageUrl: z.string() })
    )
    .mutation(({ ctx, input }) => {
      const { title, content, imageUrl } = input;
      const userId = ctx.session.user.id;

      return ctx.prisma.post.create({
        data: {
          title,
          content,
          imageUrl,
          author: { connect: { id: userId } },
          published: true,
        },
      });
    }),

  getByUser: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.prisma.post.findMany({
      where: { authorId: userId },
      include: {
        author: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }),
});
