"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useCallback, useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";

import { updateGeneralInfo } from "@/actions/Settings";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";
import { checkUsernameAvailability } from "@/actions/auth";
import { Textarea } from "./ui/textarea";

const UpdateGeneralInfo = ({ data }: { data: any }) => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string>("");

  const initialState = {
    message: "",
    status: 0,
  };

  const [state, formAction] = useActionState(updateGeneralInfo, initialState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.status === 200) {
      toast({
        title: "Success",
        description: state.message,
        type: "foreground",
      });
    } else if (state.status === 400) {
      toast({
        title: "Error",
        description: state.message,
        type: "foreground",
      });
    }
  }, [state.message, state.status]);

  const [username, setUsername] = useState(data.username);
  const [usernameStatus, setUsernameStatus] = useState<string | null>(null);

  const debouncedCheckUsername = useCallback(
    debounce(async (username: string) => {
      //check if it is the users current username
      if (username === data.username) {
        setUsernameStatus("Username is available");
        return;
      }
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
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              name="name"
              defaultValue={data.full_name}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              name="email"
              type="email"
              value={data.email}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">username</Label>
            <Input
              id="username"
              placeholder="@username"
              name="username"
              type="text"
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              name="phone"
              defaultValue={data.mobile}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Enter a short bio"
              name="bio"
              defaultValue={data.bio}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profile-picture">Profile Picture</Label>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                {profileImage ? (
                  <AvatarImage
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Picture"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        data.avatar_url || "/default-avatar.png";
                    }}
                  />
                ) : data.avatar_url ? (
                  <AvatarImage src={data.avatar_url} alt="Profile Picture" />
                ) : (
                  <AvatarFallback>
                    {data.full_name ? data.full_name[0] : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              {/* Remove button */}
              {profileImage && (
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setProfileImage(null);
                    setFileInputValue("");
                  }}
                >
                  Remove
                </Button>
              )}

              <Input
                id="profile-picture"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                name="profile-picture"
                className="w-3/4 md:w-1/3 md:ml-5"
                value={fileInputValue}
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  if (file) {
                    if (file.size > MAX_FILE_SIZE) {
                      alert("File size exceeds the 5MB limit.");
                      setProfileImage(null);
                      setFileInputValue("");
                    } else {
                      setProfileImage(file);
                      setFileInputValue(e.target.value);
                    }
                  }
                }}
              />
            </div>
          </div>
          {/* <Button variant="outline">Change</Button> */}
          <SubmitButton variant="outline" pendingText="Updating...">
            Change
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateGeneralInfo;
