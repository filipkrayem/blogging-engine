import Divider from "../ui/divider";
import SvgIcon from "../ui/svgIcon";

export default function CommentActions() {
  const handleUpvote = () => {
    console.log("upvote");
  };
  const handleDownvote = () => {
    console.log("downvote");
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-black">+3</div>
      <Divider vertical />
      <SvgIcon name="chevron" size={14} onClick={handleUpvote} />
      <Divider vertical />
      <SvgIcon
        name="chevron"
        rotation={180}
        size={14}
        onClick={handleDownvote}
      />
      <Divider vertical />
    </div>
  );
}
