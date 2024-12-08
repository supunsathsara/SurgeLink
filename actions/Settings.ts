"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateGeneralInfo = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;

  const profilePic = formData.get("profile-picture") as File;

  const supabase = await createClient();

  const session = await supabase.auth.getUser();
  console.log(session);

  let profilePicUrl = null;

  if (profilePic && profilePic.name && profilePic.size) {
    const file = profilePic;
    // Extract the file extension from the file name
    const fileExtension = file.name.split(".").pop();
    const uploadPath = `${session.data.user?.id}/profile.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(uploadPath, file, {
        upsert: true,
      });

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update profile picture",
      };
    }

    profilePicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  }

  if (profilePicUrl) {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: session.data.user?.id,
        full_name: name,
        mobile: phone,
        avatar_url: profilePicUrl,
        updated_at: new Date(),
        username,
        bio,
      })
      .select();

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update general info",
      };
    }
  } else {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: session.data.user?.id,
        full_name: name,
        mobile: phone,
        updated_at: new Date(),
        username,
        bio,
      })
      .select();

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update general info",
      };
    }
  }

  revalidatePath("/settings");
  revalidatePath(`/u/${username}`);

  return {
    status: 200,
    message: "General info updated successfully",
  };
};

export const updateSecurityInfo = async (
  prevState: any,
  formData: FormData
) => {
  const newPassword = formData.get("new-password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  //validate using zod
  const SignUpSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const validation = SignUpSchema.safeParse({
    password: newPassword,
  });

  if (validation.error) {
    return {
      status: 400,
      message: validation.error.errors[0].message,
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      status: 400,
      message: "Passwords do not match",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Could not update password",
    };
  }

  revalidatePath("/dashboard/settings");

  return {
    status: 200,
    message: "Password updated successfully",
  };
};
