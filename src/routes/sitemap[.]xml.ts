import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/supabaseClient";

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = ["/", "/sobre", "/psicoterapia", "/blog", "/contato"];
        if (supabase) {
          const { data, error } = await supabase.from("posts").select("slug");
          if (error) {
            console.error("Não foi possível carregar os posts para o sitemap:", error);
          } else {
            paths.push(
              ...(data ?? [])
                .filter((post): post is { slug: string } => typeof post.slug === "string")
                .map((post) => `/blog/${encodeURIComponent(post.slug)}`),
            );
          }
        }

        const urls = [...new Set(paths)].map((path) => escapeXml(new URL(path, origin).toString()));
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
