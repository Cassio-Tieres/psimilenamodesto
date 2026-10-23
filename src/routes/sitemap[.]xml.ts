import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/sobre", "/psicoterapia", "/blog", "/contato"];
        const { posts } = await import("@/data/posts");
        const all = [...paths, ...posts.map((p) => `/blog/${p.slug}`)];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...all.map(
            (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
