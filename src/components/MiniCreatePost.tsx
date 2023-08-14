"use client";

import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FiImage, FiLink2 } from "react-icons/fi";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost = ({ session }: MiniCreatePostProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />
        </div>

        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="Create Post"
        />

        <Button
          variant="ghost"
          onClick={() => router.push(pathname + "/submit")}
        >
          <FiImage className="text-zinc-600 w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => router.push(pathname + "/submit")}
        >
          <FiLink2 className="text-zinc-600 w-6 h-6" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
