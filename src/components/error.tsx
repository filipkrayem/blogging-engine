type ErrorProps = {
  message?: string;
};

export default function Error(props: ErrorProps) {
  return (
    <div>
      <p>{props.message ?? "Oops... Something went wrong..."}</p>
    </div>
  );
}
