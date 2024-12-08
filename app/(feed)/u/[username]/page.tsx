import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { formatDistanceToNow } from "date-fns";
import { CogIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UserProfileProps {
  params: Promise<{ username: string }>;
}


export default async function UserProfile({ params }: UserProfileProps) {
  const { username } = await params;
  const supabase = await createClient();

  const {
    data: { user: session },
  } = await supabase.auth.getUser();

  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id,username,full_name,avatar_url,bio")
    .eq("username", username)
    .single();

  if (userError) {
    notFound();
  }
  const { data: posts, error: postsError } = await supabase
    .from("feed_view")
    .select("post_id, like_count, created_at, username, url, is_liked_by_user")
    .eq("username", user.username)
    .order("created_at", { ascending: false });

  const loading = !posts && !postsError;

  if (postsError) {
    console.error("Error fetching posts:", postsError.message);
  }

  return (
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        {/* Profile header */}
        <div className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
            <AvatarImage src={user.avatar_url} alt="Profile" />
            <AvatarFallback>
              {user?.full_name?.split(" ").map((name: string[]) => name[0])}{" "}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col items-center space-y-4 text-center sm:items-start sm:text-left">
            <div>
              <h1 className="text-2xl font-bold">{user.full_name}</h1>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <p className="max-w-md">{user.bio || ""}</p>
            <div className="flex space-x-4">
              <div>
                <span className="font-bold">{posts?.length || 0}</span> posts
              </div>
            </div>
            {session?.id === user.id && (
              <Link href={`/settings`}>
                <Button variant="default">
                  <CogIcon className="h-4 w-4 mr-2" />
                  settings
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="w-full space-y-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            posts?.map((post) => (
              <PostCard
                key={post.post_id}
                postId={post.post_id}
                likeCount={post.like_count}
                date={formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
                username={username}
                url={post.url}
                isLikedByUser={post.is_liked_by_user}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
