import Image from "next/image";
import { useRouter } from "next/router";
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
  const router = useRouter();
  console.log(router);

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
        <div className="flex h-full flex-1 flex-col items-start justify-start gap-6 ">
          <h2 className="text-[40px] font-medium leading-[48px] text-black">
            {post.title}
          </h2>

          <AuthorAndDate name={post.author.name} date={post.created_at} />

          {post.imageUrl && (
            <div className="relative h-[300px] w-full">
              <Image
                src={post.imageUrl}
                alt="Post image"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div className="text-xl font-normal leading-8 text-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          <Divider />
        </div>
        <Comments postId={post.id} />
      </div>
      <div className="">suggested articles</div>
    </div>
  );
}
