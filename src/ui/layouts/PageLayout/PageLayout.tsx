import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};
export const PageLayout = ({ children }: Props) => {
  return (
    <div className=" flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm shadow-neutral-300">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link to={"/"} className="text-lg font-semibold">
              Case Studies Writer
            </Link>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#" className="text-neutral-600 hover:text-neutral-900">
              Portfolio
            </a>
          </nav>
        </div>
      </header>

      {/* Page */}
      <div className="flex-1">
        <div className="lg:8/12 xl:w-6/12 mx-auto px-6 py-8">
          {/* Main content */}
          <main className="min-w-0">
            <div className="max-w-none">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
