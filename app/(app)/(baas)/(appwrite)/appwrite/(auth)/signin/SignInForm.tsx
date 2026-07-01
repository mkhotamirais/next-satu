"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/custom/InputPassword";
import { signInSchema } from "@/lib/schemas/appwrite/auth";
import { signIn } from "@/actions/appwrite/auth";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type Infer = z.infer<typeof signInSchema>;

export function SignInForm() {
  const form = useForm<Infer>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const pending = form.formState.isSubmitting;

  const onSubmit = async (data: Infer) => {
    const res = await signIn(data);
    if (!res.ok) {
      toast.error(res.message);
      return; // stop di sini kalau error!
    }

    toast.success(res.message);
    form.reset();
    router.push("/appwrite/account");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
              <InputPassword {...field} id="password" aria-invalid={fieldState.invalid} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={pending} className="w-full mt-4 py-4">
        {pending && <Spinner />}
        Sign In
      </Button>
    </form>
  );
}
