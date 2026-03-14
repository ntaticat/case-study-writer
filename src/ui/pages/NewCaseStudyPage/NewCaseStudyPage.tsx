import { ProjectImage } from "@/ui/components/ProjectImage/ProjectImage";
import { ProjectLinks } from "@/ui/components/ProjectLinks/ProjectLinks";
import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";
import { useState } from "react";
import { Link } from "react-router-dom";

const NewCaseStudyPage = () => {
  const [title, setTitle] = useState("");

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
              to="/"
              className="text-sm px-3 py-1.5 rounded border border-slate-300 text-slate-400
                         hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </Link>
            <button
              className="text-sm px-3 py-1.5 rounded border border-slate-400 text-slate-600
                         hover:bg-slate-400 hover:text-white transition-colors"
            >
              Guardar
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

        {/* Divider */}
        <div className="border-b border-slate-200 mb-0" />

        {/* Editor */}
        <RichTextEditor />

        {/* Separador */}
        <div className="border-t border-slate-200 mt-8" />

        {/* Nuevas secciones */}
        <ProjectImage />
        <ProjectLinks />
      </div>
    </div>
  );
};

export default NewCaseStudyPage;
