"use client";
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { editSnippet } from "@/actions";

type SnippetEditFormProps = {
  snippet: Snippet;
};

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const onEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={code}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        onChange={onEditorChange}
      />

      <form action={editSnippetAction}>
        <button className="p-2 bg-blue-300 mt-2 rounded border" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default SnippetEditForm;
