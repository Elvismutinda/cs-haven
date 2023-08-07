"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Button, buttonVariants } from "./ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useToast } from "../hooks/use-toast";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { userAuthSchema } from "@/lib/validators/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email.",
      description:
        "We've sent you a login link. Be sure to check your spam too.",
    });
  }

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
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading || isGithubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        type="button"
        onClick={logInWithGoogle}
        disabled={isLoading || isGoogleLoading || isGithubLoading}
        size="sm"
        className="w-full"
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            className="mr-2"
            src="/google.svg"
            width={20}
            height={20}
            alt="google logo"
          />
        )}{" "}
        Google
      </Button>
      <Button
        onClick={logInWithGithub}
        disabled={isLoading || isGoogleLoading || isGithubLoading}
        size="sm"
        className="w-full"
      >
        {isGithubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            className="mr-2"
            src="/github-mark-white.svg"
            width={20}
            height={20}
            alt="github logo"
          />
        )}{" "}
        Github
      </Button>
    </div>
  );
};

export default UserAuthForm;
