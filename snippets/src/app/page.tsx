import { db } from "@/db";
import Link from "next/link";

// force dynamic
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// caching
// export const revalidate = 3; // 0 => disable

export default async function HomePage() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map(s => (
    <Link
      key={s.id}
      className="flex justify-between items-center p-2 border rounded"
      href={`/snippets/${s.id}`}
    >
      <p>{s.title}</p>
      <p> View</p>
    </Link>
  ));

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border rounded p-2">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
