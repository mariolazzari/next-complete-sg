"use server";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import paths from "@/paths";
import { db } from "@/db";

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
  slug: string,
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
  if (!session || !session.user?.id) {
    return {
      errors: {
        _form: ["You must be logged in"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  });

  if (!topic) {
    return {
      errors: {
        _form: [`Topic not found with slug ${slug}`],
      },
    };
  }

  let post: Post;
  try {
    const { title, content } = res.data;

    post = await db.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error creating post";

    return {
      errors: {
        _form: [message],
      },
    };
  }

  revalidatePath(paths.postCreate(slug));
  redirect(paths.postShown(slug, post.id));
}
