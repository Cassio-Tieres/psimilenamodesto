import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "@/components/blog/BlogPost";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Post - Blog" },
      {
        name: "description",
        content: "Leitura completa de um post do blog da psicóloga.",
      },
    ],
  }),
  component: () => {
    const { slug } = Route.useParams();
    return <BlogPost slug={slug} />;
  },
});
