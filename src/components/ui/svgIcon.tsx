import Image from "next/image";
type IconProps = {
  name: string;
  size: number;
  alt?: string;
  rotation?: number;
  onClick?: () => void;
};

export default function SvgIcon(props: IconProps) {
  const { size, rotation, name, alt, onClick } = props;
  const defaultSize = 12;

  return (
    <Image
      src={`/${name}.svg`}
      alt={alt ?? "icon"}
      width={size ?? defaultSize}
      height={size ?? defaultSize}
      style={{
        transform: `rotate(${rotation ?? 0}deg)`,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={props.onClick}
    ></Image>
  );
}
