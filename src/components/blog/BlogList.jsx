import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, ImageOff, SearchX } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { createExcerpt, formatBlogDate } from "@/lib/blog";
import { supabase } from "@/supabaseClient";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      if (!supabase) {
        if (isMounted) {
          setError("Configure as variáveis do Supabase para carregar o blog.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("id,title:titulo,slug,content,img_thumb,created_at:create_at")
        .order("create_at", { ascending: false });

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }

      setLoading(false);
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-earth">
            Blog
          </p>
          <h1 className="mt-5 text-4xl font-serif leading-tight text-moss sm:text-5xl lg:text-6xl">
            Reflexões sobre cuidado, presença e o cotidiano da psicoterapia.
          </h1>
          {/* <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Textos atualizados diretamente no Supabase, com ordenação por data de
            publicação e leitura leve para o visitante.
          </p> */}
        </div>

        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-3xl border border-moss/10 bg-white">
                <div className="aspect-[4/3] animate-pulse bg-moss/10" />
                <div className="space-y-4 p-6">
                  <div className="h-3 w-20 animate-pulse rounded bg-moss/10" />
                  <div className="h-7 w-5/6 animate-pulse rounded bg-moss/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-moss/10" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-moss/10" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-14 rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-rose-700"
          >
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-dashed border-moss/20 bg-white/70 px-6 py-16 text-center">
            <SearchX className="mx-auto text-earth" size={36} />
            <p className="mt-5 text-lg font-medium text-moss">Nenhum post encontrado.</p>
            {/* <p className="mt-2 text-sm leading-7 text-slate-600">
              Quando houver publicações no banco, elas aparecerão aqui automaticamente.
            </p> */}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group overflow-hidden rounded-3xl border border-moss/10 bg-white shadow-[0_8px_30px_-20px_rgba(31,55,42,0.35)] transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-moss/5">
                  {post.img_thumb ? (
                    <img
                      src={post.img_thumb}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-leaf/50 to-paper">
                      <ImageOff className="text-earth/60" size={28} />
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-earth/80">
                    <CalendarDays size={14} />
                    <span>{formatBlogDate(post.created_at)}</span>
                  </div>
                  <h2 className="text-2xl font-serif leading-tight text-moss transition-colors group-hover:text-earth">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-7 text-slate-600">
                    {createExcerpt(post.content)}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-moss transition-colors group-hover:text-earth">
                    Ler post
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

export default BlogList;
