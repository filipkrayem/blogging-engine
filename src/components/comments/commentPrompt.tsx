import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Avatar from "../ui/avatar";
import Input from "../form/input";
import useCreateComment from "~/hooks/mutations/comments/useCreateComment";

type FormInput = {
  content: string;
};

type CommentPromptProps = {
  postId: string;
};

export default function CommentPrompt(props: CommentPromptProps) {
  const { postId } = props;

  const session = useSession();
  const utils = api.useContext();

  const create = useCreateComment();

  const { register, handleSubmit, reset } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    reset();

    create.mutate(
      { postId: postId, content: data.content },
      {
        onSuccess: () => {
          void utils.comments.get.refetch({ postId: postId });
        },
      }
    );
  };

  if (!session.data)
    return (
      <div className="flex w-full justify-center">
        <p>Log in to add a comment</p>
      </div>
    );

  return (
    <form
      className="flex w-full flex-row gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Avatar imageUrl={session.data.user.image} size={44} />
      <div className="flex w-full">
        <Input
          name="content"
          placeholder="Join the discussion..."
          register={register}
          registerOptions={{ required: true }}
        />
      </div>
    </form>
  );
}
