import { ProjectImage } from "@/ui/components/ProjectImage/ProjectImage";
import { ProjectLinks } from "@/ui/components/ProjectLinks/ProjectLinks";
import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type ProjectLink = { label: string; url: string };

const NewCaseStudyPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [links, setLinks] = useState<ProjectLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    try {
      const response = await fetch("http://localhost:5265/api/case-studies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("case-study-writer-token")}`,
        },
        body: JSON.stringify({
          title,
          description,
          content,
          imageUrl,
          tags: [],
          links: links.map((link, index) => ({
            label: link.label,
            url: link.url,
            order: index,
          })),
        }),
      });

      if (!response.ok) throw new Error("Error al guardar.");

      const data = await response.json();
      navigate(`/${data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-700 w-full min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm text-slate-400 font-medium tracking-wide">
            Nuevo case study
          </span>
          <div className="flex items-center gap-2">
            <Link
              to="/case-studies"
              className="text-sm px-3 py-1.5 rounded border border-slate-300 text-slate-400
                         hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSave}
              disabled={!title.trim() || saving || uploading}
              className="text-sm px-3 py-1.5 rounded border border-slate-400 text-slate-600
             hover:bg-slate-400 hover:text-white transition-colors
             disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving
                ? "Guardando..."
                : uploading
                  ? "Subiendo imagen..."
                  : "Guardar"}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del proyecto..."
          className="w-full bg-transparent text-2xl font-semibold text-slate-700
                     placeholder:text-slate-300 outline-none border-none mb-4
                     caret-slate-400 font-serif"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Breve descripción del proyecto..."
          className="w-full bg-transparent text-sm text-slate-500
             placeholder:text-slate-300 outline-none border-none mb-4
             caret-slate-400"
        />

        {/* Divider */}
        <div className="border-b border-slate-200 mb-0" />

        {/* Editor */}
        <RichTextEditor onChange={setContent} />

        {/* Separador */}
        <div className="border-t border-slate-200 mt-8" />

        {/* Nuevas secciones */}
        <ProjectImage onChange={setImageUrl} onUploadingChange={setUploading} />
        <ProjectLinks onChange={setLinks} />
      </div>
    </div>
  );
};

export default NewCaseStudyPage;
