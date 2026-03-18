import { ProjectImage } from "@/ui/components/ProjectImage/ProjectImage";
import { ProjectLinks } from "@/ui/components/ProjectLinks/ProjectLinks";
import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

type ProjectLink = { label: string; url: string };

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  links: { label: string; url: string; order: number }[];
};

const UpdateCaseStudyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [links, setLinks] = useState<ProjectLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const response = await fetch(
          `http://localhost:5265/api/case-studies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("case-study-writer-token")}`,
            },
          },
        );
        if (!response.ok) throw new Error("No encontrado.");
        const data: CaseStudy = await response.json();

        setCaseStudy(data);
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setImageUrl(data.imageUrl);
        setLinks(
          data.links
            .sort((a, b) => a.order - b.order)
            .map(({ label, url }) => ({ label, url })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim()) return;

    console.log({
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
    });

    setSaving(true);
    try {
      const response = await fetch(
        `http://localhost:5265/api/case-studies/${id}`,
        {
          method: "PATCH",
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
        },
      );

      if (!response.ok) throw new Error("Error al guardar.");
      navigate(`/case-studies/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-400">Cargando...</p>
      </div>
    );

  if (!caseStudy)
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-sm text-slate-400">Caso de estudio no encontrado.</p>
      </div>
    );

  return (
    <div className="bg-slate-50 text-slate-700 w-full min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-sm text-slate-400 font-medium tracking-wide">
            Editando case study
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/case-studies/${id}`}
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
                  : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
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

        <div className="border-b border-slate-200 mb-0" />

        <RichTextEditor initialContent={content} onChange={setContent} />

        <div className="border-t border-slate-200 mt-8" />

        <ProjectImage
          initialImage={imageUrl ?? undefined}
          onChange={setImageUrl}
          onUploadingChange={setUploading}
        />
        <ProjectLinks initialLinks={links} onChange={setLinks} />
      </div>
    </div>
  );
};

export default UpdateCaseStudyPage;
