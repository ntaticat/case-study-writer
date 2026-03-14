import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

type ProjectImageProps = {
  initialImage?: string;
};

export const ProjectImage = ({ initialImage }: ProjectImageProps) => {
  const [preview, setPreview] = useState<string | null>(initialImage ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  return (
    <div className="mt-8">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-3">
        Imagen del proyecto
      </p>

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Banner del proyecto"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/60 text-white
                       opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900/80"
          >
            <X size={14} />
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded
                       bg-slate-900/60 text-white opacity-0 group-hover:opacity-100
                       transition-opacity hover:bg-slate-900/80"
          >
            Cambiar
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-36 rounded-lg border border-dashed border-slate-300
                     dark:border-slate-700 flex flex-col items-center justify-center
                     gap-2 cursor-pointer text-slate-400 hover:border-slate-400
                     hover:text-slate-500 dark:hover:border-slate-600 transition-colors"
        >
          <ImagePlus size={20} />
          <span className="text-sm">Arrastra una imagen o haz clic</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};
