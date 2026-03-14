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
  Image as ImageIcon,
} from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";

type MenuBarProps = { editor: Editor };

const Divider = () => (
  <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-0.5" />
);

type ToolButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  title?: string;
};

const ToolButton = ({
  onClick,
  disabled,
  active,
  children,
  title,
}: ToolButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      flex items-center justify-center w-8 h-8 rounded transition-colors text-sm
      ${
        active
          ? "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      }
      ${disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
    `}
  >
    {children}
  </button>
);

export const MenuBar = ({ editor }: MenuBarProps) => {
  const s = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isStrike: ctx.editor.isActive("strike"),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),
      isCode: ctx.editor.isActive("code"),
      canCode: ctx.editor.can().chain().toggleCode().run(),
      isParagraph: ctx.editor.isActive("paragraph"),
      isH1: ctx.editor.isActive("heading", { level: 1 }),
      isH2: ctx.editor.isActive("heading", { level: 2 }),
      isH3: ctx.editor.isActive("heading", { level: 3 }),
      isBulletList: ctx.editor.isActive("bulletList"),
      isOrderedList: ctx.editor.isActive("orderedList"),
      isCodeBlock: ctx.editor.isActive("codeBlock"),
      isBlockquote: ctx.editor.isActive("blockquote"),
      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run(),
    }),
  });

  return (
    <div className="flex flex-wrap items-center gap-0.5 py-1.5 border-b border-slate-200 dark:border-slate-700 mb-0">
      {/* Grupo 1: Marks */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={s.isBold}
        disabled={!s.canBold}
        title="Negrita"
      >
        <Bold size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={s.isItalic}
        disabled={!s.canItalic}
        title="Cursiva"
      >
        <Italic size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={s.isStrike}
        disabled={!s.canStrike}
        title="Tachado"
      >
        <Strikethrough size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={s.isCode}
        disabled={!s.canCode}
        title="Código inline"
      >
        <Code2 size={15} />
      </ToolButton>

      <Divider />

      {/* Grupo 2: Tipo de bloque */}
      <ToolButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={s.isParagraph}
        title="Párrafo"
      >
        <span className="text-xs font-medium">P</span>
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        active={s.isH1}
        title="Título 1"
      >
        <Heading1 size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={s.isH2}
        title="Título 2"
      >
        <Heading2 size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={s.isH3}
        title="Título 3"
      >
        <Heading3 size={15} />
      </ToolButton>

      <Divider />

      {/* Grupo 3: Listas y bloques */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={s.isBulletList}
        title="Lista"
      >
        <List size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={s.isOrderedList}
        title="Lista numerada"
      >
        <ListOrdered size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={s.isBlockquote}
        title="Cita"
      >
        <Quote size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={s.isCodeBlock}
        title="Bloque de código"
      >
        <Code2 size={15} />
      </ToolButton>

      <Divider />

      {/* Grupo 4: Historia + imagen */}
      <ToolButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!s.canUndo}
        title="Deshacer"
      >
        <Undo2 size={15} />
      </ToolButton>
      <ToolButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!s.canRedo}
        title="Rehacer"
      >
        <Redo2 size={15} />
      </ToolButton>

      <Divider />

      <ToolButton
        onClick={() => document.getElementById("tiptap-image-upload")?.click()}
        title="Insertar imagen"
      >
        <ImageIcon size={15} />
      </ToolButton>
      <input
        type="file"
        accept="image/*"
        id="tiptap-image-upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            editor
              .chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          };
          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};
