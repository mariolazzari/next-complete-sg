"use server";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import paths from "@/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const res = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!res.success) {
    return {
      errors: res.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ["You must be logged in"],
      },
    };
  }

  return {
    errors: {},
  };
}
