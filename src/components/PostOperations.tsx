import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/AlertDialog";
import { LuLoader2 } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

async function deletePost(postId: string) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    toast({
      title: "Something went wrong",
      description: "Your post was not deleted. Please try again later.",
      variant: "destructive",
    });
  }

  return true;
}

interface PostOperationsProps {
  post: Pick<Post, "id" | "title">;
}

const PostOperations = ({ post }: PostOperationsProps) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FaEllipsisH className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/editor/${post.id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this community?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 focus:ring-red-600"
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deletePost(post.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
            >
              {isDeleteLoading ? (
                <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FiTrash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostOperations;
