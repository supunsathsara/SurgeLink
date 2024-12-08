"use client";

import Link from "next/link";
import { signInAction } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/components/form-message";
import { useSearchParams } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  const [status, setStatus] = useState("");
  const captchaRef = useRef(null);

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form action={signInAction}>
        {message && (
          <div className="bg-green-200/80 mb-4 text-green-800 p-2 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 mb-4 text-red-800 p-2 rounded">
            {error.split(", ").map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </div>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            ref={captchaRef}
            className="mb-6"
            options={{
              theme: "dark",
            }}
            onError={() => setStatus("error")}
            onExpire={() => setStatus("expired")}
            onSuccess={() => setStatus("solved")}
          />
          <SubmitButton pendingText="Logging in" className="w-full"
          disabled={status !== "solved"}
          >
            Login
          </SubmitButton>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
