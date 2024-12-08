import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface PostProps {
  likeCount: number;
  date: string;
  username: string;
  url: string;
}

const PostCard: React.FC<PostProps> = ({ likeCount, date, username, url }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="aspect-square bg-muted">
        <img
          src={url}
          alt="Post"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-sm text-muted-foreground">{likeCount} likes</span>
          </div>
          <Link href={`/u/${username}`} className="text-sm font-medium hover:underline">
            {username}
          </Link>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;