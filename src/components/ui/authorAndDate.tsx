import { formatDate } from "~/utils/formatDate";
import SvgIcon from "./svgIcon";

type AuthorAndDateProps = {
  name: string;
  date: Date;
};

export default function AuthorAndDate(props: AuthorAndDateProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <p className="text-sm leading-tight text-gray-500">{props.name}</p>
      <div className="hidden sm:block">
        <SvgIcon name="dot" size={4} />
      </div>
      <p className="text-sm leading-tight text-gray-500">
        {formatDate(props.date, { dateStyle: "medium" })}
      </p>
    </div>
  );
}
