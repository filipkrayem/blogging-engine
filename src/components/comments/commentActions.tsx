import { api } from "~/utils/api";
import Divider from "../ui/divider";
import SvgIcon from "../ui/svgIcon";

type CommentActionsProps = {
  commentId: string;
};

export default function CommentActions(props: CommentActionsProps) {
  const { commentId } = props;

  const utils = api.useContext();
  const votes = api.comments.getVotes.useQuery({ commentId });

  const vote = api.comments.vote.useMutation({
    onMutate: async ({ commentId, vote }) => {
      await utils.comments.getVotes.cancel({ commentId });
      const prevData = utils.comments.getVotes.getData()!;

      utils.comments.getVotes.setData({ commentId }, (prev) => ({
        upvotes: vote === "increment" ? prev!.upvotes + 1 : prev!.upvotes - 1,
      }));

      return prevData;
    },
    onError: (_err, { commentId }, prevData) => {
      utils.comments.getVotes.setData({ commentId }, () => ({
        upvotes: prevData!.upvotes,
      }));
    },
  });

  const handleUpvote = () => {
    vote.mutate({ commentId, vote: "increment" });
  };
  const handleDownvote = () => {
    vote.mutate({ commentId, vote: "decrement" });
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-black">
        {votes.isLoading ? 0 : votes.data?.upvotes}
      </div>
      <Divider vertical />
      <SvgIcon name="chevron" size={14} onClick={() => void handleUpvote()} />
      <Divider vertical />
      <SvgIcon
        name="chevron"
        rotation={180}
        size={14}
        onClick={() => void handleDownvote()}
      />
      <Divider vertical />
    </div>
  );
}
