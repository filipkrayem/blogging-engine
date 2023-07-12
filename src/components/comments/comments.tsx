import { api } from "~/utils/api";
import Loading from "../ui/loading";
import Comment from "./comment";
import CommentPrompt from "./commentPrompt";

import Error from "../error";

type CommentsProps = {
  postId: string;
};

export default function Comments(props: CommentsProps) {
  const {
    data: comments,
    isError,
    error,
    isLoading,
  } = api.comments.get.useQuery({ postId: props.postId, page: 1 });

  if (isError) return <Error message={error.message} />;

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="text-2xl font-medium leading-7 text-black">
        Comments ({comments?.length})
      </h2>
      <CommentPrompt />

      <div>
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
