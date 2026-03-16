import { Link, useParams } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import CaseStudyItem from "./CaseStudyItem/CaseStudyItem";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

type CaseStudy = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  tags: string[];
};

const CaseStudiesPage = () => {
  const { userId } = useParams();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetch_ = async () => {
      try {
        const response = await fetch(
          `http://localhost:5265/api/case-studies/user/${userId}`,
        );
        if (!response.ok) throw new Error("Error al cargar.");
        const data = await response.json();
        setCaseStudies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetch_();
  }, [userId]);

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8 px-5">
        <h1 className="text-2xl font-serif font-semibold tracking-tight text-slate-700">
          Case studies
        </h1>
        <Link
          to="new"
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg
                     border border-slate-300 text-slate-600
                     hover:bg-slate-100 transition-colors"
        >
          <Plus size={15} />
          Nuevo
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400 px-5">Cargando...</p>
      ) : caseStudies.length === 0 ? (
        <p className="text-sm text-slate-400 px-5">
          No hay casos de estudio aún.
        </p>
      ) : (
        <div className="px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {caseStudies.map((cs, index) => (
            <CaseStudyItem key={cs.id} userId={userId!} index={index} {...cs} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default CaseStudiesPage;
