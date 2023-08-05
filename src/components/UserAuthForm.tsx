"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useToast } from "../hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const logInWithGoogle = async () => {
    setIsGoogleLoading(true);

    try {
      //throw new Error("test");
      await signIn("google");
    } catch (error) {
      // toast notification
      toast({
        title: "A problem has been encountered.",
        description: "Something went wrong while trying to login with Google.",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const logInWithGithub = async () => {
    setIsGithubLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      // toast notification
      toast({
        title: "A problem has been encountered.",
        description: "Something went wrong while trying to login with Github.",
        variant: "destructive",
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        type="button"
        onClick={logInWithGoogle}
        isLoading={isGoogleLoading}
        size="sm"
      >
        {isGoogleLoading ? null : (
          <Image
            className="mr-2"
            src="/google.svg"
            width={20}
            height={20}
            alt="google logo"
          />
        )}
        Google
      </Button>
      <Button
        onClick={logInWithGithub}
        isLoading={isGithubLoading}
        size="sm"
        className="ml-2"
      >
        {isGithubLoading ? null : (
          <Image
            className="mr-2"
            src="/github-mark-white.svg"
            width={20}
            height={20}
            alt="github logo"
          />
        )}
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
