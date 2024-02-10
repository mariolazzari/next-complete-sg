"use server";
import { Topic } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase or dashes without spaces",
    }),
  description: z.string().min(10),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  await new Promise(res => setTimeout(res, 2000));

  const res = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!res.success) {
    return {
      errors: res.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged"],
      },
    };
  }

  let topic: Topic;
  try {
    const { name, description } = res.data;
    topic = await db.topic.create({
      data: {
        slug: name,
        description,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Something went wrong...";
    return {
      errors: {
        _form: [msg],
      },
    };
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
