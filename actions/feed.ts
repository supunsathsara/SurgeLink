"use server";

import { createClient } from "@/utils/supabase/server";

export const toggleLike = async (postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("toggle_like", {
    p_post_id: postId,
  });
  if (error) {
    console.error("Error toggling like:", error.message);
    return { error: "Error toggling like" };
  }

  return data;
};
