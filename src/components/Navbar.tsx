import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SearchBar from "./SearchBar";

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

        {/* TODO: Add Github and Discord links next to org logo */}

        {/* <Link
          href="https://github.com/cshaven-org"
          target="_blank"
        >
          <Image
            src="/github-mark.svg"
            width={23}
            height={23}
            alt="github logo"
          />
        </Link>

        <Link
          href="https://discord.com"
          target="_blank"
        >
          <Image
            src="/discord-alt.svg"
            width={23}
            height={23}
            alt="discord logo"
          />
        </Link> */}

        {/* Search bar */}
        <SearchBar />

        {session?.user ? (
          <UserAccountNav user={session.user} />
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
