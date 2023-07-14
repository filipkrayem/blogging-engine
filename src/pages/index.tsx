import Posts from "~/components/posts/posts";

export default function Home() {
  return (
    <>
      <div className="flex h-full w-full flex-1 flex-col items-start justify-start gap-8 rounded-xl xl:w-3/4 ">
        <Posts />
      </div>
    </>
  );
}
