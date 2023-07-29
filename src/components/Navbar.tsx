import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/cs-haven.svg" width={43} height={43} alt="logo" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            CS HAVEN
          </p>
        </Link>

        {/* Search bar */}

        {session?.user ? (
          <UserAccountNav user={session.user}/>
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
