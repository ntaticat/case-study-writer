import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 relative overflow-hidden">
      {/* Grid background sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(203 213 225 / 0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(203 213 225 / 0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-serif text-base font-semibold text-slate-700 tracking-tight">
          casestudy
        </span>
        <div className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="text-sm px-3 py-1.5 text-slate-500 hover:text-slate-700
                       transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/auth/register"
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-400
                       text-slate-600 hover:bg-slate-400 hover:text-white
                       transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-32">
        <div
          className="inline-block text-xs font-medium text-slate-400 border border-slate-200
                        rounded-full px-3 py-1 mb-8 tracking-widest uppercase"
        >
          Para desarrolladores
        </div>

        <h1 className="font-serif text-5xl font-semibold text-slate-700 leading-tight mb-6">
          Documenta lo que
          <br />
          construiste y <span className="text-slate-400">por qué.</span>
        </h1>

        <p className="text-slate-500 text-lg leading-relaxed max-w-xl mb-10">
          Un espacio para registrar la arquitectura, decisiones técnicas y
          aprendizajes de tus proyectos. Para recordar, repasar, y compartir con
          quien quieras.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/auth/register"
            className="text-sm px-5 py-2.5 rounded-lg border border-slate-400
                       text-slate-600 hover:bg-slate-400 hover:text-white
                       transition-colors font-medium"
          >
            Empezar gratis
          </Link>
          <Link
            to="/auth/login"
            className="text-sm px-5 py-2.5 text-slate-400 hover:text-slate-600
                       transition-colors"
          >
            Ya tengo cuenta →
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <div className="border-t border-slate-200 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Editor rico",
              description:
                "Escribe con headings, código, imágenes y citas. El formato que un desarrollador necesita.",
            },
            {
              title: "Perfil público",
              description:
                "Comparte tu portafolio técnico con empleadores o colegas con un enlace.",
            },
            {
              title: "Solo tuyo",
              description:
                "Tus notas, tu arquitectura, tus decisiones. Un registro personal que crece contigo.",
            },
          ].map((feature) => (
            <div key={feature.title}>
              <h3 className="font-serif text-base font-semibold text-slate-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
