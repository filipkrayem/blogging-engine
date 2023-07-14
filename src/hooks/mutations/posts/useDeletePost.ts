import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function useDeletePost() {
  const utils = api.useContext();

  const deletePost = api.posts.delete.useMutation({
    onMutate: async (id) => {
      await utils.posts.getByUser.cancel();

      const previousPosts = utils.posts.getByUser.getData() ?? [];

      utils.posts.getByUser.setData(
        undefined,
        previousPosts.filter((post) => post.id !== id)
      );

      return previousPosts;
    },

    onSuccess: () => {
      toast.success("Post deleted!");
    },

    onError: (err, _vars, ctx) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );

      utils.posts.getByUser.setData(undefined, ctx);
    },
    onSettled: (_data, _err, _vars, _ctx) => {
      void utils.posts.getByUser.invalidate();
    },
  });

  return deletePost;
}
