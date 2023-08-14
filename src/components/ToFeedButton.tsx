"use client";

import { FiChevronLeft } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/Button";

const ToFeedButton = () => {
  const pathname = usePathname();

  // if path is /c/mycom, turn into /
  // if path is /c/mycom/post/cligad6jf0003uhest4qqkeco, turn into /c/mycom

  const communityPath = getCommunityPath(pathname);

  return (
    <a href={communityPath} className={buttonVariants({ variant: "ghost" })}>
      <FiChevronLeft className="h-4 w-4 mr-1" />
      {communityPath === "/" ? "Back home" : "Back to community"}
    </a>
  );
};

const getCommunityPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  if (splitPath.length === 3) return "/";
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  // default path, in case pathname does not match expected format
  else return "/";
};

export default ToFeedButton;
