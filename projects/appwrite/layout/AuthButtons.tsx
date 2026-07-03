import { getLoggedInUser } from "@/lib/server/appwrite.query";
import AuthButtonsClient from "./AuthButtonsClient";

export default async function AuthButtons() {
  const user = await getLoggedInUser();

  return <AuthButtonsClient user={user} />;
}
