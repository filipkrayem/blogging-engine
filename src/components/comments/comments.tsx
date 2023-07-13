import { api } from "~/utils/api";
import Loading from "../ui/loading";
import Comment from "./comment";
import CommentPrompt from "./commentPrompt";

import Error from "../error";

type CommentsProps = {
  postId: string;
};

export default function Comments(props: CommentsProps) {
  const { postId } = props;
  const {
    data: comments,
    isError,
    error,
    isLoading,
  } = api.comments.get.useQuery({ postId: postId });

  if (isError) return <Error message={error.message} />;

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="h2">Comments ({comments?.length})</h2>

      <CommentPrompt postId={postId} />

      <div className="flex max-h-96 flex-col gap-6 overflow-y-scroll">
        {isLoading ? (
          <Loading />
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
