import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Feed: logged in and not logged in */}

        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* Community info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <FiHome className="w-4 h-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal feed of posts from your subscribed communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href="/c/create"
            >
              Create Community
            </Link>

            <div className="flex flex-col justify-center">
              <p className="text-center">
                Join our socials. Everyone is welcome
              </p>
              <div className="flex flex-row gap-6 justify-center">
                <Link
                  href="https://github.com/cshaven-org"
                  target="_blank"
                  className="my-2 hover:scale-125 transition duration-300 ease-in-out"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>

                <Link
                  href="https://discord.com"
                  target="_blank"
                  className="my-2 hover:scale-125 transition duration-300 ease-in-out"
                >
                  <FaDiscord className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
