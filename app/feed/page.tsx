import CreatePost from "@/components/CreatePost";
import FeedPosts from "@/components/FeedPosts";
import ProfileCard from "@/components/ProfileCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Suspense } from "react";

export default function FeedLayout() {
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
          <Suspense fallback={<div>Loading...</div>}>
            <FeedPosts />
          </Suspense>
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
