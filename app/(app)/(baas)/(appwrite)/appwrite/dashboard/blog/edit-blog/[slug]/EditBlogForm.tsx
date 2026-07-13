"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { blogSchema, InferBlogSchema } from "@/lib/schemas/appwrite/blog";
import { updateBlog } from "@/actions/appwrite/blog"; // ← bukan createBlog!
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Blog } from "@/lib/types/appwrite";

export default function EditBlogForm({ blog }: { blog: Blog }) {
  const form = useForm<InferBlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog.title || "",
      content: blog.content || "",
      image: undefined,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(blog?.imageUrl || null);
  const [removeImage, setRemoveImage] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null;

    onChange(file);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setRemoveImage(false);
    } else {
      setImagePreview(null);
    }
  };

  const handleRemoveImage = (onChange: (file: null) => void) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    onChange(null);
    setImagePreview(null);
    setRemoveImage(true);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: InferBlogSchema) => {
    const { title, content, image } = data;
    const slug = blog.slug;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("removeImage", String(removeImage));
    if (image) {
      formData.append("image", image as File);
    }

    const res = await updateBlog(slug, formData);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    form.reset();
    router.refresh();
    router.back();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Image */}
        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="image">Image</FieldLabel>
              <div className="space-y-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  aria-invalid={fieldState.invalid}
                  ref={(e) => {
                    field.ref(e);
                    imageInputRef.current = e;
                  }}
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />

                {/* {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}

                {imagePreview && (
                  <div className="relative mt-2">
                    <Image
                      src={imagePreview}
                      alt="preview"
                      width={500}
                      height={300}
                      className="w-full h-56 object-contain rounded border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(field.onChange)}
                      className="absolute right-3 top-3"
                    >
                      <X />
                    </Button>
                  </div>
                )}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Blog title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Content */}
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="content">Content</FieldLabel>
              <Textarea
                {...field}
                id="content"
                aria-invalid={fieldState.invalid}
                placeholder="Blog content"
                rows={8}
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" disabled={pending} className="w-full mt-4 py-4">
        {pending && <Spinner />}
        Update Blog {/* ← bukan Create Blog! */}
      </Button>
    </form>
  );
}
