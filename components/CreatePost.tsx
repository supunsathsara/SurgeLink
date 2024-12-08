"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function CreatePost() {
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > MAX_FILE_SIZE) {
        toast({
          title: "Error",
          description: "File size exceeds the limit of 5MB",
          type: "foreground",
        });
        return;
      }
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting post with image:", image);

    if (!image) {
      toast({
        title: "Error",
        description: "Please upload an image",
        type: "foreground",
      });
      return;
    }

    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    const postId = uuidv4();
    if (error || !session?.user) {
      console.error("Error getting session:", error?.message);
      return;
    }

    setIsUploading(true);
    const fileExtension = image.name.split(".").pop();

    // Construct the upload path with the file extension
    const uploadPath = `${session.user.id}/${postId}.${fileExtension}`;

    const { data: imageData, error: imageError } = await supabase.storage
      .from("posts")
      .upload(uploadPath, image);

    if (imageError) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to upload image",
        type: "foreground",
      });
      setIsUploading(false);

      return;
    }
    const { data, error: insertError } = await supabase.from("posts").insert({
      id: postId,
      user_id: session.user.id,
      content_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageData.fullPath}`,
    });

    if (insertError) {
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to create post",
        type: "foreground",
      });
      setIsUploading(false);

      return;
    }

    // Show success toast
    toast({
      title: "Success",
      description: "Post created successfully",
      type: "foreground",
    });
    setIsUploading(false);

    // Reset the image state after submission
    setImage(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Upload an image to share with your followers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Picture
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
              />
            </div>
            {image && (
              <div className="col-span-3 col-start-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-48 rounded object-cover"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!image || isUploading}>
              {isUploading ? "Uploading..." : "Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
