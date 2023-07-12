import Image from "next/image";

type AvatarProps = {
  imageUrl?: string | null;
  size?: number;
};
export default function Avatar(props: AvatarProps) {
  const { imageUrl, size } = props;

  const defaultSize = 44;
  return (
    <div className="flex flex-row">
      {imageUrl ? (
        <div
          style={{ width: size ?? defaultSize, height: size ?? defaultSize }}
          className="relative"
        >
          <Image
            src={imageUrl}
            alt="User Avatar"
            width={size ?? defaultSize}
            height={size ?? defaultSize}
            className="rounded-full"
          ></Image>
        </div>
      ) : (
        <div className="h-11 w-11 rounded-full bg-primary"></div>
      )}
    </div>
  );
}
