import { type User, type Post, type Comment } from "@prisma/client";
import Link from "../link";
import { useRouter } from "next/router";
import AuthorAndDate from "../ui/authorAndDate";
import Image from "next/image";

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
      <div className="relative h-60 w-72 ">
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

        <div className="flex flex-row items-center gap-3">
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
