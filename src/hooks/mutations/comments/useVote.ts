import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

export default function useVote() {
  const utils = api.useContext();

  const voteMutation = api.comments.vote.useMutation({
    onMutate: async ({ commentId, vote, postId }) => {
      await utils.comments.get.cancel({ postId });
      const prevData = utils.comments.get.getData({ postId })!;

      const delta = vote === "increment" ? 1 : -1;

      utils.comments.get.setData({ postId }, (old) =>
        old!.map((comment) => {
          if (comment.id !== commentId) {
            return comment;
          }

          return {
            ...comment,
            upvotes: comment.upvotes + delta,
          };
        })
      );

      return prevData;
    },

    onError: (err, vars, prevData) => {
      console.error(err);
      toast.error(
        err.message ?? "Something went wrong. Please try again later."
      );
      utils.comments.get.setData({ postId: vars.postId }, prevData);
    },
  });

  return voteMutation;
}
