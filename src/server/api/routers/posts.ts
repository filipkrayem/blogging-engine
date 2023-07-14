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
      z.object({
        title: z.string(),
        content: z.string(),
        perex: z.string(),
        imageUrl: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { title, content, imageUrl, perex } = input;
      const userId = ctx.session.user.id;

      return ctx.prisma.post.create({
        data: {
          title,
          content,
          imageUrl,
          perex,
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

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const post = await ctx.prisma.post.findUnique({
        where: { id: input },
        select: {
          authorId: true,
        },
      });
      console.log(userId, post?.authorId);

      //NOTE: this would also be the place where I'd check if the user has admin privileges
      // Admins can delete any post, but regular users can only delete their own posts

      if (post?.authorId !== userId) {
        throw new Error("You are not authorized to delete this post");
      }

      return ctx.prisma.post.delete({
        where: { id: input },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        perex: z.string(),
        imageUrl: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, title, content, imageUrl, perex, published } = input;

      const post = await ctx.prisma.post.findUnique({
        where: { id: id },
        select: {
          authorId: true,
        },
      });

      if (post?.authorId !== userId) {
        throw new Error("You are not authorized to update this post");
      }

      return ctx.prisma.post.update({
        where: { id: id },
        data: {
          title,
          content,
          imageUrl,
          published,
          perex,
        },
      });
    }),
});
