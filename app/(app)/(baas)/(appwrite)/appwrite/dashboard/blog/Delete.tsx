"use client";

import { deleteBlog } from "@/actions/appwrite/blog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { smartTrim } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  title: string;
};

export default function Delete({ id, title }: Props) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const res = await deleteBlog(id);
    if (!res.ok) {
      alert(res.message);
      return;
    }

    toast.success(res.message);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {smartTrim(title, 20)}? Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undoneeee</DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Button type="button" variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant={"secondary"} className="btn-secondary">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
