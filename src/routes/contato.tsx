import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contato")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin && origin !== new URL(request.url).origin) {
          return Response.json({ error: "Origem inválida." }, { status: 403 });
        }

        let data: unknown;
        try {
          data = await request.json();
        } catch {
          return Response.json({ error: "Dados inválidos." }, { status: 400 });
        }

        if (!data || typeof data !== "object") {
          return Response.json({ error: "Dados inválidos." }, { status: 400 });
        }

        const fields = data as Record<string, unknown>;
        if (typeof fields.website === "string" && fields.website.trim()) {
          return Response.json({ ok: true });
        }

        const name = typeof fields.nome === "string" ? fields.nome.trim() : "";
        const email = typeof fields.email === "string" ? fields.email.trim() : "";
        const message = typeof fields.mensagem === "string" ? fields.mensagem.trim() : "";
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || name.length > 120 || !validEmail || email.length > 254 || !message || message.length > 5000) {
          return Response.json({ error: "Confira os dados e tente novamente." }, { status: 400 });
        }

        const account = process.env.GMAIL_SMTP_EMAIL || "naorespondasites26@gmail.com";
        const appPassword = process.env.GMAIL_APP_PASSWORD;
        const to = process.env.CONTACT_EMAIL_TO || "psimilenamodesto@gmail.com";
        if (!appPassword) {
          return Response.json(
            { error: "O envio do formulário ainda está sendo configurado." },
            { status: 503 },
          );
        }

        try {
          const { sendGmailContactEmail } = await import("@/lib/gmail-smtp.server");
          await sendGmailContactEmail({ account, appPassword, to, replyTo: email, name, message });
        } catch (error) {
          console.error("Falha ao enviar formulário pelo Gmail SMTP:", error);
          return Response.json(
            { error: "Não foi possível enviar sua mensagem agora. Tente novamente." },
            { status: 502 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
  head: () => ({
    meta: [
      { title: "Contato Milena Modesto" },
      {
        name: "description",
        content:
          "Entre em contato para agendar uma conversa. Atendimento online por videochamada.",
      },
      { property: "og:title", content: "Contato Milena Modesto" },
      {
        property: "og:description",
        content: "Um primeiro passo possível, no seu tempo.",
      },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setFormMessage("");
    setFormError("");

    try {
      const response = await fetch("/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome"),
          email: formData.get("email"),
          mensagem: formData.get("mensagem"),
          website: formData.get("website"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setFormError(result.error || "Não foi possível enviar sua mensagem agora.");
        return;
      }

      form.reset();
      setFormMessage("Mensagem enviada com sucesso. Obrigada pelo contato.");
    } catch {
      setFormError("Não foi possível enviar sua mensagem agora. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-20 lg:pt-28 pb-12">
        <p className="editorial-eyebrow">Contato</p>
        <h1 className="display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-3xl">
          Quando estiver pronto,
          <br /><span className="italic text-earth">basta dizer</span>.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/70">
          Pode escrever sem se preocupar em explicar tudo. Um motivo simples, uma
          dúvida ou apenas um "gostaria de conversar" já é suficiente.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-12 pb-32 grid lg:grid-cols-12 gap-16">
        {/* FORM */}
        <form onSubmit={onSubmit} className="lg:col-span-7 space-y-10">
          <label aria-hidden="true" className="hidden" tabIndex={-1}>
            Não preencha este campo
            <input name="website" type="text" autoComplete="off" tabIndex={-1} />
          </label>
          {[
            { id: "nome", label: "Seu nome", type: "text", required: true },
            { id: "email", label: "Seu e-mail", type: "email", required: true },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="editorial-eyebrow block mb-3">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required={f.required}
                className="w-full bg-transparent border-b border-moss/30 focus:border-earth outline-none py-3 text-lg text-moss placeholder:text-moss/30 transition-colors duration-300"
              />
            </div>
          ))}

          <div>
            <label htmlFor="mensagem" className="editorial-eyebrow block mb-3">
              O que gostaria de dizer
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={5}
              placeholder="Escreva no seu ritmo…"
              className="w-full bg-transparent border-b border-moss/30 focus:border-earth outline-none py-3 text-lg text-moss placeholder:text-moss/30 resize-none transition-colors duration-300"
            />
          </div>

          {formMessage ? (
            <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {formMessage}
            </p>
          ) : null}
          {formError ? (
            <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-3 bg-moss text-cream rounded-full px-8 py-4 text-sm tracking-wide hover:bg-earth transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>

        {/* INFO */}
        <aside className="lg:col-span-4 lg:col-start-9 space-y-10">
          <div>
            <p className="editorial-eyebrow">Outros caminhos</p>
            <ul className="mt-6 space-y-5 text-moss">
              <li>
                <a href="https://wa.me/5579999536112" className="flex items-center gap-3 link-soft">
                  <MessageCircle size={18} className="text-earth" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://instagram.com/psimilenamodesto" className="flex items-center gap-3 link-soft">
                  <Instagram size={18} className="text-earth" /> @psimilenamodesto
                </a>
              </li>
              <li>
                <a href="mailto:psimilenamodesto@gmail.com" className="flex items-center gap-3 link-soft">
                  <Mail size={18} className="text-earth" /> psimilenamodesto@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-paper/70 grain rounded-[1.5rem] p-8">
            <p className="font-serif text-xl leading-snug text-moss">
              "Não há pressa. O cuidado começa no momento em que você decide se escutar."
            </p>
          </div>

          <div className="text-xs tracking-[0.2em] uppercase text-moss/50">
            Atendimento online · Brasil & Exterior
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
