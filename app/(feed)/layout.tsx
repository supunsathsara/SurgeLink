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
      <div className="container mx-auto flex flex-col lg:flex-row min-h-screen max-w-7xl gap-8 px-4 py-8">
        {/* Top section with logo, create post, and profile on mobile */}
        <div className="flex flex-col lg:hidden space-y-4">
          <Link href="/" className="text-2xl font-bold">
            SurgeLink
          </Link>
          <CreatePost />
          <ProfileCard />
          <form action={signOutAction} className="text-center mt-8">
            <Button type="submit" variant={"outline"}>
              Sign out
            </Button>
          </form>
        </div>

        {/* Left section with logo on larger screens */}
        <div className="hidden lg:block w-64 space-y-4">
          <Link href="/" className="text-2xl font-bold">
            SurgeLink
          </Link>
          <CreatePost />
        </div>

        {/* Main content */}
        <div className="flex-1">{children}</div>

        {/* Right sidebar with profile on larger screens */}
        <div className="hidden lg:block w-72">
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