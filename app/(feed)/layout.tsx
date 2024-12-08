import { signOutAction } from "@/actions/auth";
import CreatePost from "@/components/CreatePost";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto flex min-h-screen max-w-7xl gap-8 px-4 py-8">
        {/* Left section with logo */}
        <div className="hidden w-64 space-y-4 lg:block">
          <Link href="/" className="text-2xl font-bold">
            SurgeLink
          </Link>
          <CreatePost />
        </div>
        <div className="flex-1">{children}</div>

        {/* Right sidebar with profile */}
        <div className="hidden w-72 lg:block">
          <ProfileCard />
          <form action={signOutAction} className="text-center mt-8">
            <Button type="submit" variant={"outline"}>
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
