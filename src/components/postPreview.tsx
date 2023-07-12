import { type User, type Post, type Comment } from "@prisma/client";
import Image from "next/image";
import { formatDate } from "~/utils/formatDate";
import { Link } from "./link";

type PostPreviewProps = Post & { author: User; comments: Comment[] };

export const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="flex flex-row items-center gap-6">
      <div className="">image</div>
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="text-2xl font-medium leading-7">{props.title}</h2>

        <div className="flex flex-row items-center gap-3">
          <p className="text-sm leading-tight text-gray-500">
            {props.author.name}
          </p>
          <div>
            <Image src="/dot.svg" alt="dot" width={4} height={4}></Image>
          </div>
          <p className="text-sm leading-tight text-gray-500">
            {formatDate(props.created_at, { dateStyle: "medium" })}
          </p>
        </div>

        <p className="">{props.content}</p>

        <div className="flex flex-row items-center gap-3">
          <Link href={`/posts/${props.id}`} className="text-sm text-blue-600">
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
};
