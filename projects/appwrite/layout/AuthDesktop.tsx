"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/actions/appwrite/auth";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

export default function AuthDesktop({ className }: Props) {
  const { user, setUser, loading } = useUser();
  const router = useRouter();

  let content = null;

  if (loading) content = null;

  if (user) {
    content = (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="grayscale" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Hi {user.name}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/appwrite/account" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              {user.role === "admin" && (
                <DropdownMenuItem asChild>
                  <Link href="/appwrite/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => {
                  await signOut();
                  setUser(null);
                  router.push("/appwrite/signin");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    content = (
      <div className="space-x-2">
        <Button variant={"ghost"}>
          <Link href="/appwrite/signin">Sign in</Link>
        </Button>
        <Button>
          <Link href="/appwrite/signup">Sign up</Link>
        </Button>
      </div>
    );
  }
  return <div className={`${className} hidden md:block`}>{content}</div>;
}
