import { RichTextEditor } from "@/ui/components/RichTextEditor/RichTextEditor";

const NewCaseStudyPage = () => {
  return (
    <div className="bg-slate-50 text-slate-700 w-full min-h-screen">
      <div className="max-w-6/12 mx-auto leading-7 caret-slate-400 selection:caret-slate-200/60 comic-relief-regular">
        <RichTextEditor />
      </div>
    </div>
  );
};

export default NewCaseStudyPage;
