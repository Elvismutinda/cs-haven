"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useToast } from "../hooks/use-toast";

const UserAuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const logInWithGoogle = async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  const logInWithGithub = async () => {
    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        type="button"
        onClick={logInWithGoogle}
        isLoading={isLoading}
        size="sm"
        className=""
        
      >
        {isLoading ? null : (
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
        isLoading={isLoading}
        size="sm"
        className="ml-2"
      >
        {isLoading ? null : (
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
