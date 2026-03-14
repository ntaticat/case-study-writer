import { PageLayout } from "@/ui/layouts/PageLayout/PageLayout";

// datos mock mientras no hay backend
const mockCaseStudy = {
  title: "Arquitectura de un sistema de notificaciones en tiempo real",
  content: `<h2>El problema</h2><p>Necesitábamos...</p><pre><code>const ws = new WebSocket(...)</code></pre>`,
  createdAt: "2024-03-14",
  tags: ["websockets", "redis", "node"],
};

const CaseStudyPage = () => {
  const { title, content, createdAt, tags } = mockCaseStudy;

  return (
    <PageLayout>
      {/* Header */}
      <header>...</header>

      {/* Contenido del editor */}
      <article
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PageLayout>
  );
};

export default CaseStudyPage;
