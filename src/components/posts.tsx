import { api } from "~/utils/api";
import { Loading } from "./loading";
import { Error } from "./error";
import { formatDate } from "~/utils/formatDate";
import { UploadButton } from "~/utils/uploadthing";

export const Posts = () => {
  const { data, isLoading, isError } = api.posts.getPublished.useQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      {!data && <p>No posts yet... :(</p>}
      {data?.map((post) => (
        <div
          key={post.id}
          className="flex h-72 w-full flex-col items-start justify-start gap-2 rounded-xl bg-neutral-200/40 p-5"
        >
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="text-sm text-neutral-500">
            {formatDate(post.created_at, { dateStyle: "medium" })} -{" "}
            {post.author.name}
          </p>
        </div>
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
