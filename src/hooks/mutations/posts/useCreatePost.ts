import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function useCreatePost() {
  const session = useSession({ required: true });

  const utils = api.useContext();
  const createPost = api.posts.create.useMutation({
    onMutate: async ({ title, content, imageUrl }) => {
      await utils.posts.getPublished.cancel();

      const previousPosts = utils.posts.getPublished.getData();

      utils.posts.getPublished.setData(undefined, (old) => [
        {
          created_at: new Date(),
          content,
          id: Math.random().toString(),
          imageUrl,
          published: true,
          title,
          updated_at: new Date(),
          authorId: session.data!.user.id,
          author: session.data!.user,
          _count: {
            comments: 0,
          },
        },
        ...(old ?? []),
      ]);

      return previousPosts;
    },
    onSuccess: () => {
      toast.success("Post created!");
    },
    onError: (err, _vars, ctx) => {
      console.error(err);
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );

      utils.posts.getPublished.setData(undefined, ctx);
    },

    onSettled: (_data, _err, _vars, _ctx) => {
      void utils.posts.getPublished.invalidate();
    },
  });

  return createPost;
}
