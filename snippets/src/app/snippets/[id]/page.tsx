import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";

type SnippetShowPageProps = {
  params: {
    id: string;
  };
};

const SnippetShowPage = async ({ params }: SnippetShowPageProps) => {
  const snippet = await db.snippet.findFirst({
    where: { id: +params.id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="text-xl font-bold">{snippet.title}</h1>

        <div className="flex gap-4">
          <Link
            className="p-2 border rounded"
            href={`/snippets/${snippet.id}/edit`}
          >
            Edit
          </Link>
          <Link
            className="p-2 border rounded"
            href={`/snippets/${snippet.id}/delete`}
          >
            Delete
          </Link>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-green-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetShowPage;
