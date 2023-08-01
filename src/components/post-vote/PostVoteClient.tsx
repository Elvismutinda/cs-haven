"use client";

import { VoteType } from "@prisma/client";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useEffect, useState } from "react";
import { usePrevious } from "@mantine/hooks";
import { cn } from "@/lib/utils";

interface PostVoteClientProps {
  postId: string;
  initialVoteAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVoteAmt,
  initialVote,
}: PostVoteClientProps) => {
  const { loginToast } = useCustomToasts();
  const [voteAmt, setVoteAmt] = useState<number>(initialVoteAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      {/* Upvote */}
      <Button size='sm' variant='ghost' aria-label="upvote">
        <ArrowBigUp className={cn('h-5 w-5 text-zinc-700', {'text-emerald-500 fill-emerald-500': currentVote === 'UP',})} />
      </Button>

      {/* Vote count */}
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {voteAmt}
      </p>

      {/* Downvote */}
      <Button size='sm' className={cn({'text-emerald-500': currentVote === 'DOWN',})} variant='ghost' aria-label="downvote">
        <ArrowBigDown className={cn('h-5 w-5 text-zinc-700', {'text-red-500 fill-red-500': currentVote === 'DOWN'})} />
      </Button>
    </div>
  );
};

export default PostVoteClient;
