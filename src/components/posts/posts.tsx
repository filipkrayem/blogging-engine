import { api } from "~/utils/api";
import { UploadButton } from "~/utils/uploadthing";
import Error from "../error";
import Loading from "../ui/loading";
import PostPreview from "./postPreview";

export default function Posts() {
  const { data, isLoading, isError } = api.posts.getPublished.useQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!data) return <div>No posts yet... :(</div>;

  return (
    <>
      {data?.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
}
