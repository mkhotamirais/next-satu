import React from "react";

export default function ProfileForm() {
  return <div>ProfileForm</div>;
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { signIn } from "@/actions/appwrite/auth";
// import { useRouter } from "next/navigation";
// import { Spinner } from "@/components/ui/spinner";
// import { InferProfileSchema, profileSchema } from "@/lib/schemas/appwrite/profile";

// export function ProfileForm() {
//   const form = useForm<InferProfileSchema>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: { name: "", email: "", phone: "" },
//   });

//   const router = useRouter();
//   const pending = form.formState.isSubmitting;

//   const onSubmit = async (data: InferProfileSchema) => {
//     // const res = await signIn(data);
//     // if (!res.ok) {
//     //   toast.error(res.message);
//     //   return; // stop di sini kalau error!
//     // }
//     // toast.success(res.message);
//     // form.reset();
//     // router.push("/appwrite/account");
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)}>
//       <FieldGroup>
//         <Controller
//           name="name"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="name">Name</FieldLabel>
//               <Input
//                 {...field}
//                 id="name"
//                 aria-invalid={fieldState.invalid}
//                 placeholder="your name"
//                 autoComplete="off"
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="email"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="email">Email</FieldLabel>
//               <Input
//                 {...field}
//                 id="email"
//                 aria-invalid={fieldState.invalid}
//                 placeholder="your email"
//                 autoComplete="off"
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="phone"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor="phone">Phone</FieldLabel>
//               <Input
//                 {...field}
//                 id="phone"
//                 aria-invalid={fieldState.invalid}
//                 placeholder="your phone number"
//                 autoComplete="off"
//                 type="tel"
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//       </FieldGroup>
//       <Button type="submit" disabled={pending} className="w-full mt-4 py-4">
//         {pending && <Spinner />}
//         Sign In
//       </Button>
//     </form>
//   );
// }
