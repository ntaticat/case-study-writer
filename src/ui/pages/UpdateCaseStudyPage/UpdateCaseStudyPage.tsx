import { Link } from "react-router-dom";
import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";

const UpdateCaseStudyPage = () => {
  return (
    <div className="bg-slate-50 text-slate-700 w-full min-h-screen">
      <div className="max-w-6/12 mx-auto flex gap-3">
        <button className="w-full text-center border border-slate-400 rounded-sm my-3 p-2 cursor-pointer transition hover:bg-slate-400 hover:text-slate-50 text-slate-400">
          Actualizar
        </button>
        <Link
          to={"/"}
          className="border border-slate-400 rounded-sm my-3 p-2 cursor-pointer transition hover:bg-slate-400 hover:text-slate-50 text-slate-400"
        >
          Cancelar
        </Link>
      </div>
      <div className="max-w-6/12 mx-auto leading-7 caret-slate-400 selection:caret-slate-200/60 comic-relief-regular">
        <RichTextEditor />
      </div>
    </div>
  );
};

export default UpdateCaseStudyPage;
