import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function useCreateComment() {
  const session = useSession();
  const utils = api.useContext();

  const create = api.comments.create.useMutation({
    onMutate: async ({ postId, content }) => {
      await utils.comments.get.cancel();

      const previousComments = utils.comments.get.getData({ postId });

      utils.comments.get.setData({ postId }, (old) => [
        {
          created_at: new Date(),
          author: session.data!.user,
          authorId: session.data!.user.id,
          content: content,
          id: Math.random().toString(),
          postId: postId,
          upvotes: 0,
          updated_at: new Date(),
        },
        ...old!,
      ]);

      return previousComments;
    },
    onError: (err, vars, previousComments) => {
      console.error(err);
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
      utils.comments.get.setData({ postId: vars.postId }, previousComments);
    },
    onSettled: (_data, _err, vars) => {
      void utils.comments.get.invalidate({ postId: vars.postId });
    },
  });

  return create;
}
