import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          className="mx-auto"
          src="/cs-haven.svg"
          width={66}
          height={43}
          alt="logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a CS Haven account and agree to our
          User Agreement and Privacy Policy.
        </p>

        {/* Sign In form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to CS Haven?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
