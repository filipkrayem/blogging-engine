import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Error from "~/components/error";
import Table from "~/components/table/table";
import MyArticlesTable from "~/components/table/tables/myArticlesTable";
import Button from "~/components/ui/button";
import { LoadingPage } from "~/components/ui/loading";
import { api } from "~/utils/api";

export default function UserPosts() {
  useSession({
    required: true,
  });

  const router = useRouter();
  const { data, isLoading, isError, error } = api.posts.getByUser.useQuery();

  const handleCreate = async () => {
    await router.push("/posts/create");
  };

  if (isLoading) return <LoadingPage />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-8">
        <h2 className="h1 font-medium">My Articles</h2>
        <div className="w-1/3 md:w-auto">
          <Button buttonType="primary" onClick={handleCreate}>
            Create new article
          </Button>
        </div>
      </div>

      <MyArticlesTable posts={data} />
    </div>
  );
}
