import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignUp = () => {
  return (
    <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          className="mx-auto"
          src="/cs-haven.svg"
          width={48}
          height={48}
          alt="logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          Enter your email below to create an account
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="hover:text-brand underline underline-offset-4"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="hover:text-brand underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
