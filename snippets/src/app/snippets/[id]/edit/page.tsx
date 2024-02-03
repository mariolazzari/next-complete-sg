import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

type SnippetEditPageProps = {
  params: {
    id: string;
  };
};

const SnippetEditPage = async ({ params }: SnippetEditPageProps) => {
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
};

export default SnippetEditPage;
