import { ProjectImage } from "@/ui/components/ProjectImage/ProjectImage";
import { ProjectLinks } from "@/ui/components/ProjectLinks/ProjectLinks";
import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Mock — reemplazar por fetch cuando el backend esté listo
const MOCK_CASE_STUDY = {
  title: "Sistema de notificaciones en tiempo real con WebSockets",
  content: `<h2>El problema</h2><p>Necesitábamos entregar eventos a clientes conectados sin polling...</p>`,
  image:
    "https://www.tradifyhq.com/hubfs/Imported_Blog_Media/website-design-2.png",
  links: [
    { label: "Live", url: "https://mi-proyecto.vercel.app" },
    { label: "Repositorio", url: "https://github.com/usuario/mi-proyecto" },
    { label: "Docs", url: "https://docs.mi-proyecto.dev" },
  ],
};

const UpdateCaseStudyPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState(MOCK_CASE_STUDY.title);

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
              to={`/${id}`}
              className="text-sm px-3 py-1.5 rounded border border-slate-300 text-slate-400
                         hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </Link>
            <button
              className="text-sm px-3 py-1.5 rounded border border-slate-400 text-slate-600
                         hover:bg-slate-400 hover:text-white transition-colors"
            >
              Guardar cambios
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

        <div className="border-b border-slate-200 mb-0" />

        <RichTextEditor initialContent={MOCK_CASE_STUDY.content} />

        {/* Separador */}
        <div className="border-t border-slate-200 mt-8" />

        {/* Nuevas secciones */}
        <ProjectImage initialImage={MOCK_CASE_STUDY.image} />
        <ProjectLinks initialLinks={MOCK_CASE_STUDY.links} />
      </div>
    </div>
  );
};

export default UpdateCaseStudyPage;
