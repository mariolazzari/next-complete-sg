"use client";
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";

type SnippetEditFormProps = {
  snippet: Snippet;
};

const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
  const [code, setCode] = useState(snippet.code);

  const onEditorChange = (value: string = "") => {
    setCode(value);
  };

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
    </div>
  );
};

export default SnippetEditForm;
