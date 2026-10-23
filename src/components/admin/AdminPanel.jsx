import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  FileImage,
  LoaderCircle,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { slugify, formatBlogDate, storageUrlToPath } from "@/lib/blog";
import { supabase } from "@/supabaseClient";

function AdminPanel() {
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [accessConfigurationError, setAccessConfigurationError] = useState(false);
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (!supabase) {
        if (mounted) {
          setCheckingSession(false);
          navigate({ to: "/admin/login", replace: true });
        }
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!data.session) {
        setCheckingSession(false);
        navigate({ to: "/admin/login", replace: true });
        return;
      }

      const { data: adminMembership, error: membershipError } = await supabase
        .from("blog_admins")
        .select("user_id")
        .maybeSingle();

      if (!mounted) return;

      if (membershipError || !adminMembership) {
        setAccessDenied(true);
        setAccessConfigurationError(Boolean(membershipError));
        setCheckingSession(false);
        return;
      }

      setSession(data.session);
      setCheckingSession(false);
    }

    checkSession();

    if (!supabase) {
      return () => {
        mounted = false;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!nextSession) {
        setSession(null);
        navigate({ to: "/admin/login", replace: true });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    async function loadPosts() {
      if (!session || !supabase) {
        setLoadingPosts(false);
        return;
      }

      setLoadingPosts(true);
      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("id,title:titulo,slug,content,img_thumb,created_at:create_at")
        .order("create_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }

      setLoadingPosts(false);
    }

    loadPosts();
  }, [session]);

  async function handleLogout() {
    if (!supabase) return;

    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  async function handleCreatePost(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabase) {
      setError("Configure o Supabase antes de criar posts.");
      return;
    }

    if (!title.trim() || !content.trim() || !file) {
      setError("Preencha título, conteúdo e selecione uma imagem de capa.");
      return;
    }

    setSaving(true);

    const baseSlug = slugify(title);
    let slug = baseSlug;

    const { data: slugCheck, error: slugError } = await supabase
      .from("posts")
      .select("slug")
      .eq("slug", baseSlug)
      .maybeSingle();

    if (slugError) {
      setError(slugError.message);
      setSaving(false);
      return;
    }

    if (slugCheck) {
      slug = `${baseSlug}-${Date.now().toString(36)}`;
    }

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .toLowerCase();
    const path = `${slug}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(path, file, {
        contentType: file.type || `image/${ext}`,
        upsert: false,
      });

    if (uploadError) {
      setError(uploadError.message);
      setSaving(false);
      return;
    }

    const publicUrl = supabase.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
    const createdAt = new Date().toISOString();

    const { error: insertError } = await supabase.from("posts").insert({
      titulo: title.trim(),
      slug,
      content: content.trim(),
      img_thumb: publicUrl,
      create_at: createdAt,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    setMessage("Post criado com sucesso.");
    setTitle("");
    setContent("");
    setFile(null);
    setSaving(false);

    const { data } = await supabase
      .from("posts")
      .select("id,title:titulo,slug,content,img_thumb,created_at:create_at")
      .order("create_at", { ascending: false });

    setPosts(data ?? []);
  }

  async function handleDelete(post) {
    if (!supabase) return;

    const shouldDelete = window.confirm(`Excluir "${post.title}"?`);
    if (!shouldDelete) return;

    setDeletingId(post.id);
    setError("");
    setMessage("");

    const storagePath = storageUrlToPath(post.img_thumb);

    if (storagePath) {
      await supabase.storage.from("blog-images").remove([storagePath]);
    }

    const { error: deleteError } = await supabase.from("posts").delete().eq("id", post.id);

    if (deleteError) {
      setError(deleteError.message);
      setDeletingId("");
      return;
    }

    setPosts((current) => current.filter((item) => item.id !== post.id));
    setMessage("Post excluído com sucesso.");
    setDeletingId("");
  }

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-moss/10 bg-white px-5 py-4 text-moss shadow-[0_8px_30px_-20px_rgba(31,55,42,0.35)]">
          <LoaderCircle className="animate-spin" size={18} />
          <span className="text-sm font-medium">Verificando acesso...</span>
        </div>
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <section className="max-w-lg rounded-3xl border border-moss/10 bg-white p-8 text-center shadow-[0_8px_30px_-20px_rgba(31,55,42,0.35)]">
          <h1 className="text-2xl font-serif text-moss">Acesso administrativo não habilitado</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {accessConfigurationError
              ? "Não foi possível validar a permissão. Verifique se as políticas de acesso do blog foram aplicadas no Supabase."
              : "Esta conta ainda não está autorizada a gerenciar o blog. Um administrador do projeto pode habilitá-la pelo Supabase."}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 rounded-full bg-moss px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-earth"
          >
            Encerrar sessão
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-paper to-leaf/20">
      <header className="border-b border-moss/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-earth">Admin</p>
            <h1 className="mt-2 text-2xl font-serif text-moss">Painel do blog</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/blog"
              target="_blank"
              className="rounded-full border border-moss/15 bg-white px-4 py-2 text-sm font-medium text-moss transition-colors hover:border-earth hover:text-earth"
            >
              Ver blog
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-earth"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-12 lg:py-12">
        <section className="min-w-0 space-y-5">
          <div className="rounded-[2rem] border border-moss/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(31,55,42,0.25)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-earth">Publicações</p>
                <h2 className="mt-3 text-3xl font-serif text-moss">Posts cadastrados</h2>
              </div>
              {loadingPosts ? (
                <LoaderCircle className="animate-spin text-earth" size={20} />
              ) : null}
            </div>

            {message ? (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <CheckCircle2 size={16} />
                {message}
              </div>
            ) : null}

            {error ? (
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <AlertCircle size={16} />
                {error}
              </div>
            ) : null}

            <div className="mt-6 space-y-4">
              {loadingPosts ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-3xl border border-moss/10 bg-cream p-5"
                  >
                    <div className="h-4 w-24 rounded bg-moss/10" />
                    <div className="mt-4 h-6 w-3/4 rounded bg-moss/10" />
                    <div className="mt-3 h-4 w-full rounded bg-moss/10" />
                  </div>
                ))
              ) : posts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-moss/15 bg-cream/70 px-5 py-12 text-center">
                  <p className="text-lg font-medium text-moss">Nenhum post foi criado ainda.</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Use o formulário ao lado para cadastrar a primeira publicação.
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="min-w-0 [overflow-wrap:anywhere] rounded-3xl border border-moss/10 bg-cream/80 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-earth/80">
                          <CalendarDays size={14} />
                          <span>{formatBlogDate(post.created_at)}</span>
                        </div>
                        <h3 className="text-2xl font-serif text-moss">{post.title}</h3>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium text-moss">Slug:</span> {post.slug}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.id}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === post.id ? (
                          <LoaderCircle className="animate-spin" size={16} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Excluir
                      </button>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
                      {post.content}
                    </p>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="min-w-0 space-y-5">
          <div className="rounded-[2rem] border border-moss/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(31,55,42,0.25)]">
            <p className="text-xs uppercase tracking-[0.35em] text-earth">Novo post</p>
            <h2 className="mt-3 text-3xl font-serif text-moss">Cadastrar publicação</h2>

            <form onSubmit={handleCreatePost} className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-moss">Título</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-moss/15 bg-cream px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-earth"
                  placeholder="Título do post"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-moss">Conteúdo</span>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  className="w-full rounded-2xl border border-moss/15 bg-cream px-4 py-3 text-sm leading-7 outline-none transition-colors placeholder:text-slate-400 focus:border-earth"
                  placeholder="Escreva o texto do post em markdown ou texto simples..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-moss">
                  Imagem de capa
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-moss/20 bg-cream px-4 py-3">
                  <FileImage className="text-earth" size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    required
                    className="w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-moss file:px-4 file:py-2 file:text-sm file:font-medium file:text-cream hover:file:bg-earth"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss px-5 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-earth disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? <LoaderCircle className="animate-spin" size={18} /> : <Plus size={18} />}
                {saving ? "Publicando..." : "Criar post"}
              </button>
            </form>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default AdminPanel;
