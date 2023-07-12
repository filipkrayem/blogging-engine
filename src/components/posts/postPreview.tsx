import { type User, type Post, type Comment } from "@prisma/client";
import Link from "../link";
import { useRouter } from "next/router";
import AuthorAndDate from "../ui/authorAndDate";
import Image from "next/image";

type PostPreviewProps = Post & { author: User; comments: Comment[] };

export default function PostPreview(props: PostPreviewProps) {
  const router = useRouter();

  const handlePostClick = () => {
    void router.push(`/posts/${props.id}`);
  };

  return (
    <div
      className="flex w-full  cursor-pointer flex-row items-start gap-6"
      onClick={handlePostClick}
    >
      <div className="relative h-60 w-72 ">
        {props.imageUrl && (
          <Image
            src={props.imageUrl}
            alt="Post image"
            style={{ objectFit: "cover" }}
            fill={true}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-2xl font-medium leading-7">{props.title}</h2>

        <AuthorAndDate name={props.author.name} date={props.created_at} />

        <p className="">{props.content}</p>

        <div className="flex flex-row items-center gap-3">
          <Link href={`/posts/${props.id}`} className="text-sm text-primary">
            Read whole article
          </Link>
          <p className="text-sm text-secondary">
            {props.comments.length}{" "}
            {props.comments.length === 1 ? "comment" : "comments"}
          </p>
        </div>
      </div>
    </div>
  );
}
