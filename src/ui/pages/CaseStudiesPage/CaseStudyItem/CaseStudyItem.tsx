import { Link } from "react-router-dom";

const CaseStudyItem = () => {
  return (
    <Link to={"1"}>
      <article className="rounded-md overflow-hidden bg-neutral-100 shadow-md shadow-gray-400 transition hover:shadow-md hover:scale-[101%]">
        <div className="flex flex-wrap">
          <div className="flex flex-wrap content-between w-full p-3">
            <div className="w-full">
              <p className="text-left text-2xl mb-2">
                Nombre del caso de estudio
              </p>
              <p className="text-justify hyphens-auto mb-2">
                Una breve descrupción del caso de estudio que explique de qué se
                trata y cuáles fueron los resultados obtenidos.
              </p>
            </div>
          </div>
          <div className="p-3">
            <img
              className="w-full object-contain object-center rounded-lg overflow-hidden"
              src="https://www.tradifyhq.com/hubfs/Imported_Blog_Media/website-design-2.png"
              alt="projectImage"
            />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CaseStudyItem;
