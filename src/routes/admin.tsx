import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin - Milena Modesto" },
      { name: "description", content: "Painel administrativo do blog." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}
