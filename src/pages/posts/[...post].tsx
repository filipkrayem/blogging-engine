import Image from "next/image";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Comments from "~/components/comments/comments";
import Error from "~/components/error";
import AuthorAndDate from "~/components/ui/authorAndDate";
import Divider from "~/components/ui/divider";
import { LoadingPage } from "~/components/ui/loading";
import { api } from "~/utils/api";
import NotFound from "../404";

export default function PostDetail() {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(window.location.pathname.split("/")[2] as string);
  }, []);

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = api.posts.getById.useQuery(id);

  if (isLoading) return <LoadingPage />;
  if (isError) return <Error message={error.message} />;
  if (!post) return <NotFound />;

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
      <div className="flex w-full flex-1 flex-col gap-6 lg:w-7/12 lg:max-w-6xl">
        <div className="flex flex-col items-start justify-start gap-6 ">
          <h2 className="h1 font-medium">{post.title}</h2>

          <AuthorAndDate name={post.author.name} date={post.created_at} />

          {post.imageUrl && (
            <div className="relative w-full">
              <Image
                src={post.imageUrl}
                alt="Post image"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }} // optional
              />
            </div>
          )}
          <div className="text-xl font-normal leading-8 text-body prose lg:prose-xl">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          <Divider />
        </div>
        <Comments postId={post.id} />
      </div>
    </div>
  );
}
