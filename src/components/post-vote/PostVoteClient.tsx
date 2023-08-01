"use client";

import { VoteType } from "@prisma/client";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { useState } from "react";
import { usePrevious } from "@mantine/hooks";

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
  return (
    <div>
      {/* Upvote */}
      <Button>
        <ArrowBigUp />
      </Button>

      {/* Vote count */}
      <p></p>

      {/* Downvote */}
      <Button>
        <ArrowBigDown />
      </Button>
    </div>
  );
};

export default PostVoteClient;
