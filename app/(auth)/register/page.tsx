"use client";

import { checkUsernameAvailability, signUpAction } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const message = searchParams.get("message");
  const error = searchParams.get("error");

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);

  const debouncedCheckUsername = useCallback(
    debounce(async (username: string) => {
      const response = await checkUsernameAvailability(username);
      if (response.error) {
        setUsernameStatus("Username is already taken");
      } else {
        setUsernameStatus("Username is available");
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (username) {
      debouncedCheckUsername(username);
    } else {
      setUsernameStatus(null);
    }
  }, [username, debouncedCheckUsername]);

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-muted-foreground">
          Get Started with SurgeLink today
        </p>
      </div>
      <form action={signUpAction}>
        {success && (
          <div className="bg-green-200/80 mb-4 text-green-800 p-2 rounded">
            {success}
          </div>
        )}

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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="John_Doe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameStatus && (
              <p
                className={`text-sm ${usernameStatus.includes("available") ? "text-green-600" : "text-red-600"}`}
              >
                {usernameStatus}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="0712345678"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
            </div>
            <Input
              id="password"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          <SubmitButton
            pendingText="Signing Up..."
            className="w-full"
            disabled={usernameStatus !== "Username is available"}
          >
            Register
          </SubmitButton>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
