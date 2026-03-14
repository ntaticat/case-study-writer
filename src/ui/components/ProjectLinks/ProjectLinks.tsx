import { useState } from "react";
import { Plus, Trash2, ExternalLink } from "lucide-react";

type ProjectLink = {
  label: string;
  url: string;
};

type ProjectLinksProps = {
  initialLinks?: ProjectLink[];
};

const LINK_SUGGESTIONS = ["Live", "Repositorio", "Docs", "Figma", "Video demo"];

export const ProjectLinks = ({ initialLinks = [] }: ProjectLinksProps) => {
  const [links, setLinks] = useState<ProjectLink[]>(initialLinks);

  const addLink = () => setLinks((prev) => [...prev, { label: "", url: "" }]);

  const updateLink = (index: number, field: keyof ProjectLink, value: string) =>
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    );

  const removeLink = (index: number) =>
    setLinks((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="mt-8">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
        Enlaces del proyecto
      </p>

      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Label con sugerencias */}
            <input
              type="text"
              value={link.label}
              onChange={(e) => updateLink(index, "label", e.target.value)}
              placeholder="Etiqueta"
              list="link-suggestions"
              className="w-28 shrink-0 text-sm bg-transparent border border-slate-200
                         dark:border-slate-700 rounded px-2.5 py-1.5 text-slate-600
                         dark:text-slate-300 placeholder:text-slate-300
                         focus:outline-none focus:border-slate-400 transition-colors"
            />
            <datalist id="link-suggestions">
              {LINK_SUGGESTIONS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>

            {/* URL */}
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateLink(index, "url", e.target.value)}
              placeholder="https://..."
              className="flex-1 text-sm bg-transparent border border-slate-200
                         dark:border-slate-700 rounded px-2.5 py-1.5 text-slate-600
                         dark:text-slate-300 placeholder:text-slate-300
                         focus:outline-none focus:border-slate-400 transition-colors"
            />

            {/* Preview link */}
            {link.url && (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
              >
                <ExternalLink size={15} />
              </a>
            )}

            {/* Eliminar */}
            <button
              onClick={() => removeLink(index)}
              className="text-slate-300 hover:text-rose-400 transition-colors shrink-0"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addLink}
        className="mt-3 flex items-center gap-1.5 text-sm text-slate-400
                   hover:text-slate-600 transition-colors"
      >
        <Plus size={15} />
        Agregar enlace
      </button>
    </div>
  );
};
