"use server";
import { redirect } from "next/navigation";
import { db } from "@/db";

type FormState = {
  message: string;
};

export const createSnippet = async (
  formState: FormState,
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }

    const code = formData.get("code");
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return {
        message: ex.message,
      };
    }
    return {
      message: "Something went wrong....",
    };
  }

  redirect("/");
};

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id,
    },
  });

  redirect("/");
};
