import { getLoggedInUser } from "@/lib/server/appwrite.query";

export async function GET() {
  const user = await getLoggedInUser();
  return Response.json(user);
}
