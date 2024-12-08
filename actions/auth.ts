"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import TurnstileVerify from "@/lib/TurnstileVerify";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email address").min(3, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  phone: z
    .string()
    .min(9, "Phone number must be at least 9 characters")
    .max(15, "Phone number must be at most 15 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  const username = formData.get("username")?.toString();
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !name || !phone || !username) {
    return encodedRedirect("error", "/register", "All fields are required");
  }

  if (!turnstileToken) {
    return encodedRedirect("error", "/register", "Please complete the captcha");
  }

  try {
    SignUpSchema.parse({
      email,
      password,
      name,
      phone,
      username,
    });
  } catch (error) {
    return encodedRedirect(
      "error",
      "/register",
      (error as z.ZodError).errors[0].message
    );
  }

  const challenge = await TurnstileVerify(turnstileToken);

  if (!challenge.success) {
    return encodedRedirect("error", "/register", "Captcha verification failed");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: name,
        mobile: phone,
        username: username,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/register", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/register",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();
  const supabase = await createClient();

  if (!turnstileToken) {
    return encodedRedirect("error", "/login", "Please complete the captcha");
  }

  const challenge = await TurnstileVerify(turnstileToken);

  if (!challenge.success) {
    return encodedRedirect("error", "/login", "Captcha verification failed");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect("/feed");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();
  const turnstileToken = formData.get("cf-turnstile-response")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  if (!turnstileToken) {
    return encodedRedirect("error", "/login", "Please complete the captcha");
  }

  const challenge = await TurnstileVerify(turnstileToken);

  console.log(challenge);

  if (!challenge.success) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Captcha verification failed"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  try {
    ResetPasswordSchema.parse({
      password,
      confirmPassword,
    });
  } catch (error) {
    return encodedRedirect(
      "error",
      "/reset-password",
      (error as z.ZodError).errors[0].message
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const checkUsernameAvailability = async (username: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  console.log(data, error);

  if (error && error.code !== "PGRST116") {
    return { error: "Error checking username availability" };
  }

  if (data) {
    return { error: "Username is already taken" };
  }

  return { message: "Username is available" };
};
