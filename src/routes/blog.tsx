import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - Milena Modesto" },
      {
        name: "description",
        content: "Textos sobre psicoterapia, escuta e cotidiano publicados no blog.",
      },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}
