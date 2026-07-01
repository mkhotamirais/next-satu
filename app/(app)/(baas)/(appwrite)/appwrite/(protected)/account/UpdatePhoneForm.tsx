"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { InferUpdatePhoneSchema, updatePhoneSchema } from "@/lib/schemas/appwrite/profile";
import { User } from "@/lib/types/appwrite";
import { updatePhone } from "@/actions/appwrite/profile";

export function UpdatePhonForm({ phone }: { phone: User["phone"] }) {
  const form = useForm<InferUpdatePhoneSchema>({
    resolver: zodResolver(updatePhoneSchema),
    defaultValues: { phone },
  });

  const router = useRouter();
  // const pending = form.formState.isSubmitting;

  const onSubmit = async (data: InferUpdatePhoneSchema) => {
    const res = await updatePhone(data);
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
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                {...field}
                id="phone"
                aria-invalid={fieldState.invalid}
                placeholder="your phone"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="mt-2 w-fit">
        {/* {pending && <Spinner />} */}
        Update
      </Button>
    </form>
  );
}
