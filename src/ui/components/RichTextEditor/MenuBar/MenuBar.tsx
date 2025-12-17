import {
  Bold,
  Italic,
  Strikethrough,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

type MenuBarProps = {
  editor: Editor;
};

export const MenuBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState({
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
    editor,
  });

  const baseBtn =
    "flex items-center justify-center w-9 h-9 rounded-md border transition " +
    "text-gray-700" +
    "hover:bg-gray-100 active:bg-gray-100";

  const activeBtn = "!bg-gray-100 !text-black ";
  const disabledBtn = "opacity-40 cursor-not-allowed";

  return (
    <div
      className="
        sticky top-0 flex flex-wrap items-center gap-1 mb-3 p-2 border-b-2 border-blackbg-gray-200
      "
    >
      {/* MARKS */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`${baseBtn} ${editorState.isBold ? activeBtn : ""} ${
          !editorState.canBold ? disabledBtn : ""
        }`}
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`${baseBtn} ${editorState.isItalic ? activeBtn : ""} ${
          !editorState.canItalic ? disabledBtn : ""
        }`}
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={`${baseBtn} ${editorState.isStrike ? activeBtn : ""} ${
          !editorState.canStrike ? disabledBtn : ""
        }`}
      >
        <Strikethrough size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={`${baseBtn} ${editorState.isCode ? activeBtn : ""} ${
          !editorState.canCode ? disabledBtn : ""
        }`}
      >
        <Code2 size={16} />
      </button>

      {/* PARAGRAPH + HEADINGS */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${baseBtn} ${editorState.isParagraph ? activeBtn : ""}`}
      >
        P
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${baseBtn} ${editorState.isHeading1 ? activeBtn : ""}`}
      >
        <Heading1 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${baseBtn} ${editorState.isHeading2 ? activeBtn : ""}`}
      >
        <Heading2 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${baseBtn} ${editorState.isHeading3 ? activeBtn : ""}`}
      >
        <Heading3 size={16} />
      </button>

      {/* LISTS */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${baseBtn} ${editorState.isBulletList ? activeBtn : ""}`}
      >
        <List size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${baseBtn} ${editorState.isOrderedList ? activeBtn : ""}`}
      >
        <ListOrdered size={16} />
      </button>

      {/* BLOCKQUOTE */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${baseBtn} ${editorState.isBlockquote ? activeBtn : ""}`}
      >
        <Quote size={16} />
      </button>

      {/* CODE BLOCK */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${baseBtn} ${editorState.isCodeBlock ? activeBtn : ""}`}
      >
        <Code2 size={16} />
      </button>

      {/* UNDO / REDO */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className={`${baseBtn} ${!editorState.canUndo ? disabledBtn : ""}`}
      >
        <Undo2 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className={`${baseBtn} ${!editorState.canRedo ? disabledBtn : ""}`}
      >
        <Redo2 size={16} />
      </button>

      <button
        onClick={() => {
          document.getElementById("tiptap-image-upload")?.click();
        }}
        className={baseBtn}
      >
        <ImageIcon size={16} />
      </button>

      <input
        type="file"
        accept="image/*"
        id="tiptap-image-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            editor
              ?.chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          };
          reader.readAsDataURL(file);
        }}
        className="hidden"
      />
    </div>
  );
};
