import { type Post, type User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "../link";
import AuthorAndDate from "../ui/authorAndDate";

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
      className="flex w-full  cursor-pointer flex-row items-start gap-6"
      onClick={handlePostClick}
    >
      <div className="relative h-28 w-36 sm:h-60 sm:w-72 ">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt="Post image"
            style={{ objectFit: "cover" }}
            fill={true}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-2xl font-medium leading-7">{post.title}</h2>

        <AuthorAndDate name={post.author.name} date={post.created_at} />

        <p className="">{post.content}</p>

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
