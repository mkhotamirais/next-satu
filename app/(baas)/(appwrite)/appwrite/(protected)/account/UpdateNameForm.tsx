"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { InferUpdateNameSchema, updateNameSchema } from "@/lib/schemas/appwrite/profile";
import { User } from "@/lib/types/appwrite";
import { updateName } from "@/actions/appwrite/profile";

export function UpdateNameForm({ name }: { name: User["name"] }) {
  const form = useForm<InferUpdateNameSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name },
  });

  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const onSubmit = async (data: InferUpdateNameSchema) => {
    const res = await updateName(data);
    if (!res.ok) {
      toast.error(res.message);
      return; // stop di sini kalau error!
    }
    toast.success(res.message);
    (document.activeElement as HTMLElement)?.blur();
    router.refresh();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="border border-gray-300 rounded-lg p-3 flex flex-col items-end"
    >
      <FieldGroup className="">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="your name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={pending} className="mt-2 w-fit">
        {pending && <Spinner />}
        Update
      </Button>
    </form>
  );
}
