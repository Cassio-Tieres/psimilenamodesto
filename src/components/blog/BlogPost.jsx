import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import MarkdownContent from "@/components/blog/MarkdownContent";
import { formatBlogDate } from "@/lib/blog";
import { supabase } from "@/supabaseClient";

function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPost() {
      if (!supabase) {
        if (isMounted) {
          setError("Configure as variáveis do Supabase para exibir o post.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("id,title:titulo,slug,content,img_thumb,created_at:create_at")
        .eq("slug", slug)
        .maybeSingle();

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setPost(null);
      } else if (!data) {
        setError("Post não encontrado.");
        setPost(null);
      } else {
        setPost(data);
      }

      setLoading(false);
    }

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-moss transition-colors hover:text-earth"
          >
            <ArrowLeft size={16} />
            Voltar ao blog
          </Link>
          {post ? (
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-earth/80">
              <CalendarDays size={14} />
              <span>{formatBlogDate(post.created_at)}</span>
            </div>
          ) : null}
        </div>

        {loading ? (
          <div className="space-y-5 rounded-3xl border border-moss/10 bg-white p-6 shadow-[0_8px_30px_-20px_rgba(31,55,42,0.25)]">
            <div className="h-4 w-28 animate-pulse rounded bg-moss/10" />
            <div className="h-12 w-5/6 animate-pulse rounded bg-moss/10" />
            <div className="aspect-[16/9] animate-pulse rounded-3xl bg-moss/10" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-moss/10" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-moss/10" />
              <div className="h-4 w-10/12 animate-pulse rounded bg-moss/10" />
            </div>
          </div>
        ) : error ? (
          <div
            role="alert"
            className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-8 text-center text-rose-700"
          >
            <p className="text-lg font-medium">{error}</p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-earth"
            >
              <ArrowLeft size={16} />
              Voltar ao blog
            </Link>
          </div>
        ) : post ? (
          <article className="min-w-0 space-y-10">
            <header className="space-y-5">
              <h1 className="text-4xl font-serif leading-tight text-moss sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
            </header>

            {post.img_thumb ? (
              <div className="overflow-hidden rounded-[2rem] border border-moss/10 bg-white shadow-[0_20px_60px_-30px_rgba(31,55,42,0.35)]">
                <img
                  src={post.img_thumb}
                  alt={post.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}

            <div className="min-w-0 max-w-full rounded-[2rem] border border-moss/10 bg-white px-6 py-8 shadow-[0_8px_30px_-20px_rgba(31,55,42,0.18)] sm:px-8 sm:py-10">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        ) : null}
      </section>
    </SiteLayout>
  );
}

export default BlogPost;
