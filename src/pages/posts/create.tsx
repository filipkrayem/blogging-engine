import { ChangeEvent, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "~/components/ui/button";
import Input from "~/components/form/input";
import { useUploadThing } from "~/utils/uploadthing";
import TextArea from "~/components/form/textArea";
import useCreatePost from "~/hooks/mutations/posts/useCreatePost";
import { toast } from "react-hot-toast";
import FormError from "~/components/form/formError";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Image from "next/image";

type CreatePostInput = {
  title: string;
  content: string;
  perex: string;
};

export default function PostCreate() {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const [preview, setPreview] = useState<boolean>(false);

  const router = useRouter();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useSession({
    required: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreatePostInput>({
    criteriaMode: "all",
  });

  const watchedContent = watch("content", "");

  const createPost = useCreatePost();

  const onSubmit: SubmitHandler<CreatePostInput> = (data) => {
    const { title, content, perex } = data;
    createPost.mutate(
      { title, content, imageUrl, perex },
      {
        onSuccess: async (data) => {
          await router.push(`/posts/${data.id}`);
        },
      }
    );
    reset();
  };

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (!res || !res[0]) return;
      setImageUrl(res[0].fileUrl);
    },
  });

  const handlePreview = () => {
    setPreview(!preview);
  };

  const handleUploadClick = () => {
    if (!hiddenFileInput.current) return;
    hiddenFileInput.current.click();
  };

  const handleRemoveImage = () => {
    setPreviewUrl(undefined);
    setImageUrl(undefined);
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (!event.target.files) return;

    const fileUploaded = event.target.files[0];
    try {
      await toast.promise(startUpload([fileUploaded as File]), {
        loading: "Uploading image...",
        success: "Image successfully uploaded",
        error: "Error uploading image",
      });

      setPreviewUrl(URL.createObjectURL(fileUploaded!));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex w-full flex-1 flex-col gap-6 xl:w-2/3">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <h2 className="h1 font-medium">Create new article</h2>
        <div className="w-1/3 md:w-auto">
          <Button
            buttonType="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Publish article
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-11">
        <div className="flex flex-col gap-8 flex-1">
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

            <div className="flex items-center flex-row gap-10">
              <div className="flex-1 flex flex-col items-center gap-4">
                <Button
                  type="button"
                  buttonType="secondary"
                  onClick={handleUploadClick}
                >
                  Upload an image
                </Button>
                <input
                  type="file"
                  multiple={false}
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                {previewUrl && imageUrl && (
                  <p
                    className="cursor-pointer text-red-600"
                    onClick={handleRemoveImage}
                  >
                    Remove image
                  </p>
                )}
              </div>
              {previewUrl && imageUrl && (
                <div className="">
                  <Image
                    src={previewUrl}
                    alt="image"
                    priority
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "250px",
                      height: "auto",
                    }}
                  />
                </div>
              )}
            </div>
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
          <div className="flex items-start flex-1 h-full flex-col gap-8">
            <Button
              buttonType="primary"
              type="button"
              formNoValidate
              onClick={handlePreview}
            >
              {preview ? "Back to editing" : "Show preview"}
            </Button>

            {preview ? (
              <div className="text-xl w-full max-h-[500px] h-full flex-1 font-normal leading-8 text-body prose border border-borderLight rounded px-4 py-2 overflow-y-auto">
                <ReactMarkdown>{watchedContent}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex-1 flex w-full h-full">
                <TextArea
                  register={register}
                  className="text-xl w-full h-full flex-1"
                  name="content"
                  registerOptions={{ required: "Content is required" }}
                  label="Content"
                  placeholder="Supports markdown. Yay!"
                ></TextArea>
                <FormError name="content" errors={errors} />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
