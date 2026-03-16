import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/ui/layouts/PageLayout/PageLayout";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type ProjectLink = { label: string; url: string; order: number };

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  UserId: string;
  tags: string[];
  links: ProjectLink[];
};

const CaseStudyPage = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const response = await fetch(
          `http://localhost:5265/api/case-studies/${id}`,
        );
        if (!response.ok) throw new Error("No encontrado.");
        const data = await response.json();
        setCaseStudy(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [id]);

  if (loading)
    return (
      <PageLayout>
        <p className="text-slate-400 text-sm">Cargando...</p>
      </PageLayout>
    );
  if (!caseStudy)
    return (
      <PageLayout>
        <p className="text-slate-400 text-sm">Caso de estudio no encontrado.</p>
      </PageLayout>
    );

  const html = generateHTML(JSON.parse(caseStudy.content), [StarterKit, Image]);

  return (
    <PageLayout>
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-6">
        {caseStudy.imageUrl && (
          <img
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            className="w-full h-56 object-cover rounded-xl mb-8"
          />
        )}

        <h1 className="font-serif text-3xl font-semibold text-slate-700 mb-3">
          {caseStudy.title}
        </h1>

        <p className="text-slate-500 text-sm mb-4">{caseStudy.description}</p>

        <div className="flex flex-wrap items-center gap-3">
          <time className="text-xs text-slate-400">
            {new Date(caseStudy.createdAt).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {caseStudy.links.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {caseStudy.links
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded border border-slate-300
                             text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  {link.label}
                </a>
              ))}
          </div>
        )}
      </header>

      <div className="border-t border-slate-200" />

      {/* Contenido */}
      <article
        className="prose prose-slate max-w-3xl mx-auto px-6 py-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </PageLayout>
  );
};

export default CaseStudyPage;
