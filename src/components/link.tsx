import { type LinkProps } from "next/link";
import classNames from "classnames";
import NextLink from "next/link";

type MyLinkProps = LinkProps & {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
};

export const Link = (props: MyLinkProps) => {
  return (
    <div
      className={classNames("", props.className, {
        [props.activeClass ?? ""]: props.active,
        [props.inactiveClass ?? ""]: !props.active,
      })}
    >
      <NextLink href={props.href}>{props.children}</NextLink>
    </div>
  );
};
