import Image from "next/image";
import { formatDate } from "~/utils/formatDate";

type AuthorAndDateProps = {
  name: string;
  date: Date;
};

export default function AuthorAndDate(props: AuthorAndDateProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <p className="text-sm leading-tight text-gray-500">{props.name}</p>
      <div className="hidden sm:block">
        <Image src="/dot.svg" alt="dot" width={4} height={4}></Image>
      </div>
      <p className="text-sm leading-tight text-gray-500">
        {formatDate(props.date, { dateStyle: "medium" })}
      </p>
    </div>
  );
}
