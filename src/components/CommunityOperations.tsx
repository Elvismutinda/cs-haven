"use client";

import { toast } from "@/hooks/use-toast";
import { Community } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

async function deleteCommunity(name: string) {
  const res = await fetch(`/api/community/${name}`, {
    method: "DELETE",
  });

  if (!res?.ok) {
    toast({
      title: "Something went wrong",
      description: "The community could not be deleted.",
      variant: "destructive",
    });
  }

  return true;
}

interface CommunityOperationsProps {
  community: Pick<Community, "id" | "name">;
}

const CommunityOperations = ({ community }: CommunityOperationsProps) => {
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

                const deleted = await deleteCommunity(community.name);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                  router.push("/");
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

export default CommunityOperations;
