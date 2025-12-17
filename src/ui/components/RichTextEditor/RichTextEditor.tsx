import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import "./RichTextEditor.css";
import { MenuBar } from "./MenuBar/MenuBar";
import Image from "@tiptap/extension-image";

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      style: {
        default: "margin: 0 0 0.25rem 0;", // 👈 nuevo spacing
      },
    };
  },
});

export const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
      }),
      CustomParagraph,
      Placeholder.configure({
        placeholder: "Write: ",
      }),
      Image,
    ],
  });

  return (
    <div className="tiptap-editor bg-gray-200">
      <MenuBar editor={editor} />
      <EditorContent className="px-5 py-3 prose" editor={editor} />
    </div>
  );
};
