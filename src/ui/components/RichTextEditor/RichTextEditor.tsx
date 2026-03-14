import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./RichTextEditor.css";
import { MenuBar } from "./MenuBar/MenuBar";
import Image from "@tiptap/extension-image";

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Empieza a escribir el caso de estudio...",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-slate-400/60 before:pointer-events-none",
      }),
      Image,
    ],
  });

  return (
    <div className="tiptap-editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="pt-4 min-h-[60vh]" />
    </div>
  );
};
