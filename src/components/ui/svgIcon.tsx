type IconProps = {
  name: string;
  size: number;
  alt?: string;
  rotation?: number;
  onClick?: () => void;
  className?: string;
};

export default function SvgIcon(props: IconProps) {
  const { size, rotation, name, alt, onClick, className } = props;
  const defaultSize = 12;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/icons/${name}.svg`}
      alt={alt ?? "icon"}
      width={size ?? defaultSize}
      height={size ?? defaultSize}
      style={{
        transform: `rotate(${rotation ?? 0}deg)`,
        cursor: onClick ? "pointer" : undefined,
      }}
      className={className}
      onClick={props.onClick}
    />
  );
}
