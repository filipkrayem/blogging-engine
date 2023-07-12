import { type Comment } from "@prisma/client";

type CommentProps = {
  comment: Comment;
};

export default function Comment(props: CommentProps) {
  return (
    <div className="flex flex-row">
      <div className="flex h-full w-11 items-center justify-start">profil</div>

      <div className="flex flex-col">{props.comment.content}</div>
    </div>
  );
}
