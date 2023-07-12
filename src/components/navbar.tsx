import Image from "next/image";
import { Link } from "./link";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="static flex h-14 w-full flex-row items-center bg-bgLight pl-pageGutter">
      <div className="mr-8">
        <Image src="/logo.png" alt="blog logo" width={39} height={44}></Image>
      </div>
      <div className="flex flex-row items-center gap-10 p-3">
        {navbarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            active={router.pathname === link.href}
            className="hover:text-body"
            inactiveClass="text-secondary"
            activeClass="text-body"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const navbarLinks = [
  {
    href: "/",
    label: "Recent articles",
  },
  {
    href: "/about",
    label: "About",
  },
];
