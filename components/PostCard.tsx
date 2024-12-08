'use client';

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { toggleLike } from "@/actions/feed";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

interface PostProps {
  postId: string;
  likeCount: number;
  date: string;
  username: string;
  url: string;
  isLikedByUser: boolean;
}

const PostCard: React.FC<PostProps> = ({
  postId,
  likeCount,
  date,
  username,
  url,
  isLikedByUser,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likes, setLikes] = useState(likeCount);
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    // Optimistic UI update
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    // Call the server action
    startTransition(async () => {
      const result = await toggleLike(postId);
      if (result?.error) {
        // Revert the optimistic update if there's an error
        setIsLiked(isLiked);
        setLikes(likeCount);
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="aspect-square bg-muted">
        <img src={url} alt="Post" className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleLike}
              disabled={isPending}
            >
              {isLiked ? (
                <HeartFilledIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-sm text-muted-foreground">{likes} likes</span>
          </div>
          <Link
            href={`/u/${username}`}
            className="text-sm font-medium hover:underline"
          >
            {username}
          </Link>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
