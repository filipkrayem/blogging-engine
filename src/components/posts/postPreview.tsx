import { type Post, type User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "../link";
import AuthorAndDate from "../ui/authorAndDate";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type PostPreviewProps = {
  post: Post & {
    author: User;
    _count: {
      comments: number;
    };
  };
};

export default function PostPreview(props: PostPreviewProps) {
  const router = useRouter();
  const { post } = props;

  const handlePostClick = () => {
    void router.push(`/posts/${post.id}`);
  };

  return (
    <div
      className="flex w-full cursor-pointer flex-col lg:flex-row items-start gap-6"
      onClick={handlePostClick}
    >
      <div className="relative w-full flex justify-center sm:h-60 sm:w-72  ">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt="Post image"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "auto",
              height: "250px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Image
            src={"/images/no-image.jpg"}
            alt="image placeholder"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              width: "100%",
              objectFit: "cover",
              maxHeight: "250px",
              height: "auto",
            }}
          />
        )}
      </div>
      <div className="flex flex-1 w-full flex-col gap-4 lg:max-h-[250px]">
        <h2 className="text-2xl font-medium leading-7">{post.title}</h2>

        <AuthorAndDate name={post.author.name} date={post.created_at} />

        <div className="line-clamp-3 prose">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href={`/posts/${post.id}`} className="text-sm text-primary">
            Read whole article
          </Link>
          <p className="text-sm text-secondary">
            {post._count.comments}{" "}
            {post._count.comments === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>
    </div>
  );
}
