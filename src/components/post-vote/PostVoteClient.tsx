"use client";

import { VoteType } from "@prisma/client";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

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
