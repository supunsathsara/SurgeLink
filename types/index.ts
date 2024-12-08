export interface Post {
  post_id: string;
  like_count: number;
  created_at: string;
  username: string;
  url: string;
  is_liked_by_user: boolean;
}