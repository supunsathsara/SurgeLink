import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/types";
import Link from "next/link";



export default function FeedLayout() {
  const posts: Post[] = [
    {
      id: "1",
      likeCount: 10,
      date: "1 hour ago",
      username: "chutte",
      url: "https://placehold.co/600x700",
    },
    {
      id: "2",
      likeCount: 20,
      date: "2 hours ago",
      username: "username",
      url: "https://placehold.co/600x600",
    },
    {
      id: "3",
      likeCount: 30,
      date: "3 hours ago",
      username: "username",
      url: "https://placehold.co/600x500",
    },
    {
      id: "4",
      likeCount: 40,
      date: "4 hours ago",
      username: "username",
      url: "https://placehold.co/600x400",
    },
    {
      id: "5",
      likeCount: 50,
      date: "5 hours ago",
      username: "username",
      url: "https://placehold.co/600x300",
    },
  ];

  return (
    <div className="container mx-auto flex min-h-screen max-w-7xl gap-8 px-4 py-8">
      {/* Left section with logo */}
      <div className="hidden w-64 space-y-4 lg:block">
        <Link href="/" className="text-2xl font-bold">
          SurgeLink
        </Link>
        <CreatePost />
      </div>

      {/* Main feed */}
      <div className="flex-1">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-8">
            {/* Post */}
            {posts.map((post) => (
              <PostCard
                key={post.id}
                likeCount={post.likeCount}
                date={post.date}
                username={post.username}
                url={post.url}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="ghost" size="sm">
              View more
            </Button>
          </div>
        </ScrollArea>
        {/* view more */}
      </div>

      {/* Right sidebar with profile */}
      <div className="hidden w-72 lg:block">
        <ProfileCard />
      </div>
    </div>
  );
}
