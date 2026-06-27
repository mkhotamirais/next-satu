"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/custom/InputPassword";
import { InferSignUpSchema, signUpSchema } from "@/lib/schemas/appwrite/auth";
import { signUp } from "@/actions/appwrite/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function SignUpForm() {
  const form = useForm<InferSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const onSubmit = async (data: InferSignUpSchema) => {
    const res = await signUp(data);
    if (!res.ok) {
      toast.error(res.message);
      return; // stop di sini kalau error!
    }

    toast.success(res.message);
    form.reset();
    router.push("/appwrite/signin");
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
                disabled={pending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="your email"
                autoComplete="off"
                disabled={pending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputPassword {...field} id="password" aria-invalid={fieldState.invalid} disabled={pending} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <InputPassword {...field} id="confirmPassword" aria-invalid={fieldState.invalid} disabled={pending} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={pending} className="w-full mt-4 py-4">
        {pending && <Spinner />}
        Sign Up
      </Button>
    </form>
  );
}
