import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

type SnippetEditPageProps = {
  params: {
    id: string;
  };
};

export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const id = +params.id;
  const snippet = await db.snippet.findFirst({
    where: {
      id,
    },
  });

  if (!snippet) {
    return notFound();
  }

  return <SnippetEditForm snippet={snippet} />;
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map(s => ({ id: s.id.toString() }));
}
