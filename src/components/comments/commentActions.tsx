import { Comment } from "@prisma/client";
import Divider from "../ui/divider";
import SvgIcon from "../ui/svgIcon";
import useVote from "~/hooks/mutations/comments/useVote";

type CommentActionsProps = {
  comment: Comment;
};

export default function CommentActions(props: CommentActionsProps) {
  const { id, upvotes, postId } = props.comment;

  const vote = useVote();

  const handleUpvote = () => {
    vote.mutate({ commentId: id, vote: "increment", postId: postId });
  };
  const handleDownvote = () => {
    vote.mutate({ commentId: id, vote: "decrement", postId: postId });
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-black">{upvotes}</div>
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
