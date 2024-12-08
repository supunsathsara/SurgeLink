import FeedPosts from "@/components/FeedPosts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

export default function FeedLayout() {
  return (
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <Suspense fallback={<div>Loading...</div>}>
          <FeedPosts />
        </Suspense>
      </ScrollArea>
    </div>
  );
}
