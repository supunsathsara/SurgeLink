"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import PostCardSkeleton from "./PostCardSkeleton";
import { times } from "lodash";

const FeedPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/feed?page=${page}`);
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  const handleViewMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="space-y-8">
      {loading && (
        <>
          {times(3, (index) => (
            <PostCardSkeleton key={index} />
          ))}
        </>
      )}
      {!loading &&
        posts.map((post) => (
          <PostCard
            key={post.post_id}
            likeCount={post.like_count}
            date={formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
            username={post.username}
            url={post.url}
          />
        ))}
      {!loading && hasMore && (
        <div className="flex justify-center mt-4">
          <Button variant="ghost" size="sm" onClick={handleViewMore}>
            View more
          </Button>
        </div>
      )}
      {!hasMore && <div className="text-center mt-4">No more posts</div>}
    </div>
  );
};

export default FeedPosts;
