import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/components/admin/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Login - Admin" },
      { name: "description", content: "Acesso ao painel administrativo." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});
