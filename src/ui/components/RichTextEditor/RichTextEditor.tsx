import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./RichTextEditor.css";
import { MenuBar } from "./MenuBar/MenuBar";
import Image from "@tiptap/extension-image";

type RichTextEditorProps = {
  initialContent?: string;
  onChange?: (content: string) => void;
};

export const RichTextEditor = ({
  initialContent,
  onChange,
}: RichTextEditorProps) => {
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
    content: initialContent ? JSON.parse(initialContent) : undefined,
    onUpdate: ({ editor }) => {
      onChange?.(JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div className="tiptap-editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="pt-4 min-h-[60vh]" />
    </div>
  );
};
