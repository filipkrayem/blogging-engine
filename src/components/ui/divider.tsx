import classNames from "classnames";

type DividerProps = {
  vertical?: boolean;
};

export default function Divider(props: DividerProps) {
  return (
    <div
      className={classNames("bg-gray-200", {
        "h-full w-[1px]": props.vertical,
        "h-[1px] w-full": !props.vertical,
      })}
    ></div>
  );
}
