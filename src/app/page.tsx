import Footer from "@/components/Footer";
import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const session = await getAuthSession();

  const communities = await db.community.findMany({
    include: {
      subscribers: true,
    },
  });

  const popularCommunities = communities.sort(
    (a, b) => b.subscribers.length - a.subscribers.length
  );

  const topPopularCommunities = popularCommunities.slice(0, 10);

  let subscribedCommunityNames: string[] = [];

  if (session) {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        subscriptions: {
          select: {
            community: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (user) {
      subscribedCommunityNames = user.subscriptions.map(
        (sub) => sub.community.name
      );
    }
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Feed: logged in and not logged in */}

        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* Community info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last md:sticky md:top-20">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <FiHome className="w-4 h-4" />
              Home
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            {session ? (
              <>
                <div className="flex flex-col gap-x-4 py-3">
                  <h2 className="font-semibold uppercase">Your communities:</h2>
                  <ul>
                    {subscribedCommunityNames.map((communityName) => (
                      <li key={communityName}>
                        <Link
                          href={`/c/${communityName}`}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              className: "mt-4",
                            })
                          )}
                        >
                          c/{communityName}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    className={buttonVariants({
                      className: "w-full mt-4 mb-6",
                    })}
                    href="/c/create"
                  >
                    Create Community
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-x-4 py-3">
                <h2 className="font-semibold uppercase">
                  Popular communities:
                </h2>
                <ul className="flex">
                  {topPopularCommunities.map((community) => (
                    <li key={community.id}>
                      <Link
                        href={`/c/${community.name}`}
                        className={cn(
                          buttonVariants({
                            className: "mt-4",
                          })
                        )}
                      >
                        c/{community.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
              <div className="flex items-center justify-center">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
