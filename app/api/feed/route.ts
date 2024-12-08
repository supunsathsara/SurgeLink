import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const offset = (Number(page) - 1) * Number(limit);

  const supabase = await createClient();
  console.log(`Fetching page ${page}`);

  const { data, error } = await supabase
    .from("feed_view")
    .select("post_id, like_count, created_at, username, url")
    .order("created_at", { ascending: false })
    .order("like_count", { ascending: false })
    .range(offset, offset + Number(limit) - 1);

  if (error) {
    console.error("Error fetching posts:", error.message);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
