import { redirect } from "next/navigation";
// import { UpdateEmailForm } from "./UpdateEmailForm";
// import { UpdatePhonForm } from "./UpdatePhoneForm";
import { getLoggedInUser } from "@/lib/server/appwrite.query";
import { UpdateNameForm } from "./UpdateNameForm";
import { UpdateUserForm } from "./UpdateUserForm";

export default async function Account() {
  const user = await getLoggedInUser();
  if (!user) redirect("/appwrite/signin");

  return (
    <section className="max-w-xl">
      <h1 className="h1">Account</h1>
      <div className="space-y-4">
        <UpdateNameForm name={user.name} />
        <UpdateUserForm age={user.age} address={user.address} />
        {/* <UpdateEmailForm email={user.email} /> */}
        {/* <UpdatePhonForm phone={user.phone} /> */}
      </div>
    </section>
  );
}
