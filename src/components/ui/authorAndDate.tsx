import { formatDate } from "~/utils/formatDate";
import Image from "next/image";

type AuthorAndDateProps = {
  name: string;
  date: Date;
};

export default function AuthorAndDate(props: AuthorAndDateProps) {
  return (
    <div className="flex flex-row items-center gap-3">
      <p className="text-sm leading-tight text-gray-500">{props.name}</p>
      <div>
        <Image src="/dot.svg" alt="dot" width={4} height={4}></Image>
      </div>
      <p className="text-sm leading-tight text-gray-500">
        {formatDate(props.date, { dateStyle: "medium" })}
      </p>
    </div>
  );
}
