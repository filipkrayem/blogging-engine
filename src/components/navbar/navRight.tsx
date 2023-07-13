import { useSession } from "next-auth/react";
import Link from "../link";
import Avatar from "../ui/avatar";
import SvgIcon from "../ui/svgIcon";

export default function NavRight() {
  const session = useSession();

  if (!session.data?.user) {
    return (
      <div className="flex flex-row items-center">
        <Link href="/auth/login" className="text-primary hover:text-primary/80">
          <div className="flex flex-row gap-1">
            <p>Login</p> <SvgIcon name="arrow" size={24} />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-10">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={link.className}>
          {link.label}
        </Link>
      ))}

      <div className="flex flex-row items-center gap-2">
        <SvgIcon name="arrow-stepper" size={24} />
        <Avatar imageUrl={session.data.user.image} size={32} />
      </div>
    </div>
  );
}

const links = [
  {
    href: "/user/id/posts",
    label: "My Articles",
    className: "text-body",
  },
  {
    href: "/posts/create",
    label: "Create Article",
    className: "text-primary",
  },
];
