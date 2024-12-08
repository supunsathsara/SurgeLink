import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const ProfileCard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id)
    .single();

  //console.log(profile, error);

  return (
    <div className="sticky top-8 space-y-4 text-center">
      <div className="flex flex-col items-center space-y-5">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url} alt="Profile" />
          <AvatarFallback>
            {profile?.full_name?.split(" ").map((name: string[]) => name[0])}{" "}
          </AvatarFallback>
        </Avatar>
        <div className="text-lg text-center">
          <Link href={`/u/${profile?.username}`}>
            <h2 className="font-bold">{profile?.full_name || ""}</h2>
            <p className="text-sm text-muted-foreground hover:underline">
              @{profile?.username || ""}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
