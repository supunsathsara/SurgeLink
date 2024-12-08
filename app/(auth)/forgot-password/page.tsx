"use client";

import { forgotPasswordAction } from "@/actions/auth";
import { FormMessage, Message } from "@/components/form-message";
import SubmitButton from "@/components/SubmitButton";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  const [status, setStatus] = useState("");
  const captchaRef = useRef(null);
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/login">
              Sign in
            </Link>
          </p>
        </div>
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
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
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
          <SubmitButton
            formAction={forgotPasswordAction}
            pendingText="Sending reset email..."
            disabled={status !== "solved"}
          >
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
