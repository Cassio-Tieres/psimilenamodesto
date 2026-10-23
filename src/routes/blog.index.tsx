import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/components/blog/BlogList";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog - Milena Modesto" },
      {
        name: "description",
        content: "Textos sobre psicoterapia, escuta e cotidiano publicados no blog.",
      },
    ],
  }),
  component: BlogList,
});
