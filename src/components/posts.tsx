import { api } from "~/utils/api";
import { Loading } from "./loading";
import { Error } from "./error";
import { formatDate } from "~/utils/formatDate";
import { UploadButton } from "~/utils/uploadthing";
import { PostPreview } from "./postPreview";

export const Posts = () => {
  const { data, isLoading, isError } = api.posts.getPublished.useQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      {!data && <p>No posts yet... :(</p>}
      {data?.map((post) => (
        <PostPreview key={post.id} {...post} />
      ))}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
};
