import UpdateGeneralInfo from "@/components/UpdateGeneralInfo";
import { createClient } from "@/utils/supabase/server";

const SettingsPage = async () => {
  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();
  if (sessionError) {
    console.error(sessionError);
    throw new Error("An error occurred while fetching data");
  }
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
    id,
    full_name,
    mobile,
    avatar_url,
    bio,
    username
    `
    )
    .eq("id", sessionData.user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data");
  }
  return (
    <main className="flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 w-full">
      <div className="pb-6">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
      </div>
      <div className="space-y-6 mx-1 pb-12">
        <UpdateGeneralInfo data={{ ...data, email: sessionData.user.email }} />
      </div>
    </main>
  );
};
export default SettingsPage;
