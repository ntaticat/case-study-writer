// LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5265/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? "Credenciales inválidas.");
      }

      const { token } = await response.json();
      localStorage.setItem("case-study-writer-token", token);
      navigate("/case-studies");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-semibold text-slate-700 mb-1">
            Bienvenido de nuevo
          </h1>
          <p className="text-sm text-slate-400">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2
                         text-sm text-slate-700 placeholder:text-slate-300
                         focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2
                         text-sm text-slate-700 placeholder:text-slate-300
                         focus:outline-none focus:border-slate-400 transition-colors"
            />
          </div>

          {error && (
            <p
              className="text-xs text-rose-500 bg-rose-50 border border-rose-200
                          rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2 rounded-lg border border-slate-400 text-sm
                       text-slate-600 hover:bg-slate-400 hover:text-white
                       transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/auth/register" className="text-slate-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
