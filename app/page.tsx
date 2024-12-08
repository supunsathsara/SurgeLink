import { Button } from "@/components/ui/button";
import { Heart, Share2, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">SurgeLink</span>
            </Link>
          </div>
          <nav>
            <Link href="/login" passHref>
              <Button variant="outline" className="mr-2">
                Log in
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Connect, Share, Surge
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Join SurgeLink and experience a new wave of social networking.
              Share your moments, connect with friends, and discover exciting
              content.
            </p>
            <div className="space-x-4">
              <Link href="/register" passHref>
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="#features" passHref>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Discover what makes SurgeLink the next big thing in social
              networking.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Heart className="h-12 w-12 fill-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Engage</h3>
                  <p className="text-sm text-muted-foreground">
                    Like and interact with content you love.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Share2 className="h-12 w-12 fill-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your favorite moments and discoveries.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Users className="h-12 w-12 fill-primary" />
                <div className="space-y-2">
                  <h3 className="font-bold">Grow</h3>
                  <p className="text-sm text-muted-foreground">
                    Build your network and grow your audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="container space-y-6 py-8 md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Ready to Surge?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join SurgeLink today and start your journey in a new era of social
              networking.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/register" passHref>
                <Button size="lg">Sign Up Now</Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outline" size="lg">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="container">
        <div className="flex flex-col items-center justify-between gap-4 border-t py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://supunsathsara.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Supun Sathsara.
              </a>
              {" "}
              The source code is available on{" "}
              <a
                href="https://github.com/supunsathsara/SurgeLink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
