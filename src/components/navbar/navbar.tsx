import Image from "next/image";
import { useRouter } from "next/router";
import Link from "../link";
import NavRight from "./navRight";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="static left-0 right-0 top-0 flex h-14 w-full flex-row items-center justify-center bg-bgLight sm:px-10 md:justify-between lg:px-pageGutter">
      <div className="flex flex-row items-center">
        <div className="mr-8">
          <Image src="/logo.png" alt="blog logo" width={39} height={44}></Image>
        </div>
        <div className="flex flex-row items-center gap-10 p-3">
          {navbarLinksLeft.map((link) => (
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
      <NavRight />
    </div>
  );
}

const navbarLinksLeft = [
  {
    href: "/",
    label: "Recent articles",
  },
  {
    href: "/about",
    label: "About",
  },
];
