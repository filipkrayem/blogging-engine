import { useSession } from "next-auth/react";

export default function UserDetail() {
  const session = useSession({
    required: true,
  });

  return <div>user</div>;
}
