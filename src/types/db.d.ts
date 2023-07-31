import type { Post, Community, User, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  community: Community;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
