import Image from "next/image";
import { useRouter } from "next/router";
import Link from "../link";
import { useState } from "react";
import NavRight from "./navRight";
import SvgIcon from "../ui/svgIcon";

export default function Navbar() {
  const router = useRouter();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav>
      <div className="w-full px-10 lg:px-pageGutter h-14 flex flex-1 justify-between items-center">
        <div className="flex items-center gap-8">
          <div>
            <Image
              src="/logo.png"
              alt="blog logo"
              width={39}
              height={44}
            ></Image>
          </div>
          <ul className="hidden lg:flex lg:gap-10 ">
            {navbarLinksLeft.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  active={router.pathname === link.href}
                  className="hover:text-body"
                  inactiveClass="text-secondary"
                  activeClass="text-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-6">
          <div className="hidden lg:flex items-center gap-10">
            <NavRight />
          </div>
          <div className="md:hidden flex items-center">
            <SvgIcon
              name="menu"
              size={24}
              onClick={() => setToggleMenu(!toggleMenu)}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed z-40 w-full font-medium text-4xl px-8 bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-10 origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <ul className="flex flex-col text-body items-start pt-8 md:hidden gap-10">
          {navbarLinksLeft.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                active={router.pathname === link.href}
                className="hover:text-body"
                inactiveClass="text-secondary"
                activeClass="text-body"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <NavRight />
      </div>
    </nav>
  );
}
// <div className="static left-0 right-0 top-0 flex h-14 w-full flex-row items-center justify-center bg-bgLight sm:px-10 md:justify-between lg:px-pageGutter">
//   <div className="flex flex-row items-center">
//     <div className="mr-8">
//       <Image src="/logo.png" alt="blog logo" width={39} height={44}></Image>
//     </div>
//     <div className="flex flex-row items-center gap-10 p-3">
//       {navbarLinksLeft.map((link) => (
//         <Link
//           key={link.href}
//           href={link.href}
//           active={router.pathname === link.href}
//           className="hover:text-body"
//           inactiveClass="text-secondary"
//           activeClass="text-body"
//         >
//           {link.label}
//         </Link>
//       ))}
//     </div>
//   </div>
//   <NavRight />
// </div>;

// <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
//   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//     <a href="#" className="flex items-center">
//       <Image src="/logo.png" alt="blog logo" width={39} height={44}></Image>
//     </a>
//     <button
//       data-collapse-toggle="navbar-dropdown"
//       type="button"
//       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//       aria-controls="navbar-dropdown"
//       aria-expanded="false"
//     >
//       <span className="sr-only">Open main menu</span>
//       <svg
//         className="w-5 h-5"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 17 14"
//       >
//         <path
//           stroke="currentColor"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           d="M1 1h15M1 7h15M1 13h15"
//         />
//       </svg>
//     </button>
//     <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
//       <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//         {navbarLinksLeft.map((link) => (
//           <li key={link.href}>
//             <Link
//               href={link.href}
//               active={router.pathname === link.href}
//               classname="hover:text-body"
//               inactiveclass="text-secondary"
//               activeclass="text-body"
//             >
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// </nav>
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
