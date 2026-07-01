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
import { createBlog } from "@/actions/appwrite/blog";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";

export default function CreateBlogForm() {
  const form = useForm<InferBlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "" },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Reset input file juga!
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const onSubmit = async (data: InferBlogSchema) => {
    let imageFormData: FormData | undefined;
    if (imageFile) {
      imageFormData = new FormData();
      imageFormData.append("image", imageFile);
    }

    const res = await createBlog(data, imageFormData);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    router.push("/appwrite/dashboard/blog");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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

        {/* Image */}
        <Field>
          <FieldLabel>Image</FieldLabel>

          {imagePreview ? (
            <div className="relative w-full h-56 rounded-md overflow-hidden border border-border">
              <Image src={imagePreview} alt="Preview" fill className="object-contain" />
              <button
                aria-label="Remove image"
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            // Klik kotak → buka file picker
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="w-full h-56 rounded-md border border-dashed border-border bg-muted hover:bg-muted/80 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <ImagePlus className="text-muted-foreground" size={32} />
              <span className="text-sm text-muted-foreground">Click to upload image</span>
            </button>
          )}

          {/* Input file tersembunyi */}
          <input
            aria-label="Upload image"
            ref={imageInputRef}
            id="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={pending} className="w-full mt-4 py-4">
        {pending && <Spinner />}
        Create Blog
      </Button>
    </form>
  );
}
