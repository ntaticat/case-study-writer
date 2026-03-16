import { Link } from "react-router-dom";

type CaseStudyItemProps = {
  userId: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  tags: string[];
  index: number;
};

const ACCENT_COLORS = [
  "border-l-slate-400",
  "border-l-blue-300",
  "border-l-emerald-300",
  "border-l-amber-300",
  "border-l-rose-300",
  "border-l-violet-300",
];

const CaseStudyItem = ({
  userId,
  id,
  title,
  description,
  imageUrl,
  createdAt,
  tags,
  index,
}: CaseStudyItemProps) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <Link to={`/${userId}/case-studies/${id}`} className="group block">
      <article
        className={`h-full border-l-4 ${accent} bg-slate-50 border border-slate-200
          dark:border-slate-700 rounded-r-lg p-5 flex flex-col gap-3
          transition-all duration-200 group-hover:border-slate-300
          group-hover:shadow-sm`}
        style={{ borderRadius: "0 8px 8px 0" }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-32 object-cover rounded-md"
          />
        )}

        <time className="text-xs text-slate-400 tracking-wide">
          {new Date(createdAt).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h2
          className="font-serif text-lg font-semibold leading-snug text-slate-700
                       dark:text-slate-200 group-hover:text-slate-900 transition-colors"
        >
          {title}
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-100
                           dark:bg-slate-800 text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
};

export default CaseStudyItem;
