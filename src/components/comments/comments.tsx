import { type Comment as CommentType } from "@prisma/client";
import Comment from "./comment";
import CommentPrompt from "./commentPropmt";

type CommentsProps = {
  comments: CommentType[];
};

export default function Comments(props: CommentsProps) {
  return (
    <div className="flex w-full flex-col gap-6 ">
      <CommentPrompt />

      <div>
        {props.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
