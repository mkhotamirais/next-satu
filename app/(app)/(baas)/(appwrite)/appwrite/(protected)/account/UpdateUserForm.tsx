"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { InferUpdateUserSchema, updateUserSchema } from "@/lib/schemas/appwrite/profile";
import { updateUser } from "@/actions/appwrite/profile";

export function UpdateUserForm({ age, address }: { age: number | null; address: string | null }) {
  const form = useForm<InferUpdateUserSchema, unknown, InferUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { age: age?.toString() || "", address: address || "" },
  });

  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const onSubmit = async (data: InferUpdateUserSchema) => {
    const res = await updateUser(data);
    if (!res.ok) {
      toast.error(res.message);
      return;
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
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              <Input
                {...field}
                id="age"
                type="number"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                placeholder="your age"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                {...field}
                id="address"
                aria-invalid={fieldState.invalid}
                placeholder="your address"
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
