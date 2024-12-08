import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";

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
    <div className="sticky top-8 space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar_url} alt="Profile" />
          <AvatarFallback>
            {profile?.full_name?.split(" ").map((name: string[]) => name[0])}{" "}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold">{profile?.full_name || ""}</h2>
          <p className="text-sm text-muted-foreground">
            @{profile?.username || ""}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
