import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/ui/button";
import Input from "~/components/form/input";
import { UploadButton } from "~/utils/uploadthing";
import TextArea from "~/components/form/textArea";
import useCreatePost from "~/hooks/mutations/posts/useCreatePost";
import { toast } from "react-hot-toast";
import FormError from "~/components/form/formError";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type CreatePostInput = {
  title: string;
  content: string;
  perex: string;
};

export default function PostCreate() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  useSession({
    required: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    criteriaMode: "all",
  });

  const createPost = useCreatePost();

  const onSubmit: SubmitHandler<CreatePostInput> = (data) => {
    const { title, content } = data;
    createPost.mutate(
      { title, content, imageUrl },
      {
        onSuccess: async (data) => {
          await router.push(`/posts/${data.id}`);
        },
      }
    );
    reset();
  };

  return (
    <form
      className="flex w-full flex-1 flex-col gap-6 xl:w-2/3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <h2 className="h1 font-medium">Create new article</h2>
        <div className="w-1/3 md:w-auto">
          <Button buttonType="primary" type="submit">
            Publish article
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-8">
          <Input
            name="title"
            label="Article Title"
            placeholder="My first article"
            register={register}
            registerOptions={{ required: "Title is required" }}
          />

          <FormError name="title" errors={errors} />

          <div className="flex flex-col items-start gap-2">
            <p>Featured image</p>

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (!res || !res[0]) return;
                toast.success("Image successfully uploaded");
                setImageUrl(res[0].fileUrl);
              }}
              onUploadError={(_error: Error) => {
                toast.error("Error uploading image");
              }}
            />
          </div>
          <div className="flex flex-col gap-8">
            <TextArea
              register={register}
              className="text-xl"
              name="perex"
              registerOptions={{ required: "Perex is required" }}
              label="Perex"
              placeholder="Short description of the article"
              rows={4}
            ></TextArea>
            <FormError name="perex" errors={errors} />
          </div>
          <div className="flex flex-col gap-8">
            <TextArea
              register={register}
              className="text-xl"
              name="content"
              registerOptions={{ required: "Content is required" }}
              label="Content"
              placeholder="Supports markdown. Yay!"
              rows={20}
            ></TextArea>
            <FormError name="content" errors={errors} />
          </div>
        </div>
      </div>
    </form>
  );
}
