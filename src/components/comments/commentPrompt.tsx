import { useSession } from "next-auth/react";
import Avatar from "../ui/avatar";
import Input from "../ui/input";

export default function CommentPrompt() {
  const session = useSession();

  if (!session.data)
    return (
      <div className="flex w-full justify-center">
        <p>Log in to add a comment</p>
      </div>
    );

  return (
    <div className="flex w-full flex-row gap-7">
      <Avatar imageUrl={session.data.user.image} size={44} />
      <div className="flex w-full">
        <Input placeholder="Join the discussion..." />
      </div>
    </div>
  );
}
