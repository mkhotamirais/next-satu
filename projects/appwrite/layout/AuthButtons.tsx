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
import { UserExtend } from "@/lib/types/appwrite";

export default function AuthButtons({ user }: { user: UserExtend | null }) {
  if (user) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
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
