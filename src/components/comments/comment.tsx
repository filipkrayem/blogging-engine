import { type Comment, type User } from "@prisma/client";
import { formatDate } from "~/utils/formatDate";
import Avatar from "../ui/avatar";
import CommentActions from "./commentActions";

type CommentProps = {
  comment: Comment & { author: User };
};

export default function Comment(props: CommentProps) {
  const { comment } = props;

  return (
    <div className="flex flex-row gap-7">
      <Avatar imageUrl={comment.author.image} size={44} />

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <p className="font-bold">{comment.author.name}</p>
          <p className="text-sm text-secondary">
            {formatDate(comment.created_at, {}, true)}
          </p>
        </div>
        <p className="text-base">{props.comment.content}</p>

        <CommentActions comment={comment} />
      </div>
    </div>
  );
}
