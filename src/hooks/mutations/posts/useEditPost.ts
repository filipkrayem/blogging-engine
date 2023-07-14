import toast from "react-hot-toast";
import { api } from "~/utils/api";

export default function useEditPost() {
  const utils = api.useContext();

  const editPost = api.posts.update.useMutation({
    onMutate: ({ id, title, content, imageUrl }) => {
      const previous = utils.posts.getById.getData();

      utils.posts.getById.setData(id, (old) => ({
        ...old!,
        title,
        content,
        imageUrl,
      }));

      return previous;
    },
    onSuccess: () => {
      toast.success("Post updated!");
    },
    onError: (err, vars, ctx) => {
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );

      utils.posts.getById.setData(vars.id, ctx);
    },

    onSettled: (_data, _err, _vars, _ctx) => {
      void utils.posts.invalidate();
    },
  });

  return editPost;
}
