import { Link } from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout/PageLayout";
import CaseStudyItem from "./CaseStudyItem/CaseStudyItem";

const CaseStudiesPage = () => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl tracking-tight text-center">
          Registrar caso de estudio
        </h1>
      </div>
      <div className="w-full px-5">
        <Link
          to={"/new"}
          className="block w-full text-center px-4 py-2 cursor-pointer rounded-lg bg-blue-400 text-white font-medium hover:bg-blue-500 transition hover:scale-[101%]"
        >
          Registrar caso de estudio
        </Link>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...new Array(20)].map((item, index) => (
          <CaseStudyItem key={index} />
        ))}
      </div>
    </PageLayout>
  );
};

export default CaseStudiesPage;
