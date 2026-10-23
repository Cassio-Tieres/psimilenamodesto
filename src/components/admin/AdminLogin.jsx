import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { supabase } from "@/supabaseClient";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (!supabase) {
        if (mounted) setCheckingSession(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      setCheckingSession(false);

      if (data.session) {
        navigate({ to: "/admin", replace: true });
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!supabase) {
      setError("Configure as variáveis do Supabase antes de acessar o login.");
      return;
    }

    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate({ to: "/admin", replace: true });
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cream via-paper to-leaf/20 px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-moss/10 bg-white px-5 py-4 text-moss shadow-[0_8px_30px_-20px_rgba(31,55,42,0.35)]">
          <LoaderCircle className="animate-spin" size={18} />
          <span className="text-sm font-medium">Carregando sessão...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream via-paper to-leaf/20 px-4 py-10">
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-leaf/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-earth/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-moss/10 bg-white shadow-[0_30px_90px_-40px_rgba(31,55,42,0.45)] lg:grid-cols-2">
          <div className="hidden flex-col justify-between bg-moss p-10 text-cream lg:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-leaf">Área administrativa</p>
              <h1 className="mt-6 max-w-md text-4xl font-serif leading-tight text-cream">
                Acesso protegido para publicar o blog com segurança.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-cream/80">
              Entre com o email e senha cadastrados no Supabase para gerenciar postagens,
              imagens de capa e exclusões.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-8 sm:py-10">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-earth">
                Login
              </p>
              <h2 className="text-3xl font-serif leading-tight text-moss">
                Painel administrativo
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                Acesse com seu usuário do Supabase para entrar no painel protegido.
              </p>
            </div>

            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              >
                {error}
              </div>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-moss">Email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-moss/15 bg-cream px-4 py-3 focus-within:border-earth">
                <Mail className="text-earth" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="voce@exemplo.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-moss">Senha</span>
              <div className="flex items-center gap-3 rounded-2xl border border-moss/15 bg-cream px-4 py-3 focus-within:border-earth">
                <LockKeyhole className="text-earth" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-5 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-earth disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <LoaderCircle className="animate-spin" size={18} /> : null}
              {loading ? "Entrando..." : "Entrar no painel"}
            </button>

            <div className="text-center text-sm text-slate-500">
              <Link to="/" className="font-medium text-earth transition-colors hover:text-moss">
                Voltar para o site
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
