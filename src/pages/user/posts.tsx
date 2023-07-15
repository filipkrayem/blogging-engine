import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Error from "~/components/error";
import MyArticlesTable from "~/components/table/tables/myArticlesTable";
import Button from "~/components/ui/button";
import { LoadingPage } from "~/components/ui/loading";
import useDeletePost from "~/hooks/mutations/posts/useDeletePost";
import { api } from "~/utils/api";

export default function UserPosts() {
  useSession({
    required: true,
  });

  const router = useRouter();
  const { data, isLoading, isError, error } = api.posts.getByUser.useQuery();
  const deletePost = useDeletePost();

  const handleCreate = async () => {
    await router.push("/posts/create");
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <Error message={error.message} />;

  const onPostEditClick = async (postId: string) => {
    await router.push(`/posts/${postId}/edit`);
  };

  const onPostDeleteClick = (postId: string) => {
    deletePost.mutate(postId);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-row gap-8">
        <h2 className="h1 font-medium">My Articles</h2>
        <div className="w-1/3 md:w-auto">
          <Button buttonType="primary" onClick={handleCreate}>
            Create new article
          </Button>
        </div>
      </div>
      {data.length === 0 ? (
        <div>You don&apos;t have any articles yet...</div>
      ) : (
        <MyArticlesTable
          posts={data}
          onPostEditClick={onPostEditClick}
          onPostDeleteClick={onPostDeleteClick}
        />
      )}
    </div>
  );
}
