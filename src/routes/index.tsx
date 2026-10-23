import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock3, ImageOff, Leaf, LoaderCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import portrait from "@/assets/portrait-hero.jpg";
import leaves from "@/assets/nature-leaves.jpg";
import wash from "@/assets/texture-wash.jpg";
import { createExcerpt, estimateReadingTime, formatBlogDate } from "@/lib/blog";
import { supabase } from "@/supabaseClient";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milena Modesto | Psicóloga Clínica e Psicoterapia" },
      {
        name: "description",
        content:
          "Conheça o trabalho da psicóloga Milena Modesto, saiba mais sobre o atendimento psicológico e encontre informações sobre como agendar uma consulta.",
      },
      { property: "og:title", content: "Milena Modesto | Psicóloga Clínica e Psicoterapia" },
      {
        property: "og:description",
        content:
          "Conheça o trabalho da psicóloga Milena Modesto, saiba mais sobre o atendimento psicológico e encontre informações sobre como agendar uma consulta.",
      },
    ],
  }),
  component: HomePage,
});

const areas = [
  { title: "Ansiedade", text: "Quando o pensamento se adianta e o corpo não acompanha." },
  { title: "Autocobrança", text: "A voz interna que exige mais do que se pode oferecer." },
  { title: "Exaustão emocional", text: "Um cansaço que o descanso já não alcança." },
  { title: "Relações", text: "Os afetos que organizam e desorganizam quem somos." },
  { title: "Pertencimento", text: "O desejo, antigo, de caber em algum lugar." },
  { title: "Limites", text: "Reaprender a dizer sim e não a partir de si." },
];

const passos = [
  {
    n: "01",
    title: "Primeiro contato",
    text: "Conversamos brevemente para entender o que te traz e marcar o primeiro encontro.",
  },
  {
    n: "02",
    title: "Sessão inicial",
    text: "Um espaço sem pressa para nos conhecermos e construirmos juntos um caminho possível.",
  },
  {
    n: "03",
    title: "Encontros semanais",
    text: "Sessões online, com regularidade, sustentando um percurso autêntico de cuidado.",
  },
];

function HomePage() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLatestPosts() {
      if (!supabase) {
        if (isMounted) {
          setPostsError("Configure o Supabase para carregar os textos do blog.");
          setLoadingPosts(false);
        }
        return;
      }

      setLoadingPosts(true);
      setPostsError("");

      const { data, error } = await supabase
        .from("posts")
        .select("id,title:titulo,slug,content,img_thumb,created_at:create_at")
        .order("create_at", { ascending: false })
        .limit(3);

      if (!isMounted) return;

      if (error) {
        setPostsError(error.message);
        setLatestPosts([]);
      } else {
        setLatestPosts(data ?? []);
      }

      setLoadingPosts(false);
    }

    loadLatestPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[36rem] h-[36rem] blob breathe opacity-50"
          style={{ background: "var(--leaf)" }}
        />
        <div
          aria-hidden
          className="absolute top-1/3 -left-32 w-72 h-72 blob opacity-30"
          style={{ background: "var(--earth)" }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12 pt-20 lg:pt-28 pb-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 fade-up">
            <p className="editorial-eyebrow">Psicoterapia · Online · Brasil & Exterior</p>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl mt-6 max-w-2xl">
              Um espaço para
              <span className="italic text-earth"> respirar</span>,
              <br />
              sentir e existir.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/70">
              Psicoterapia humanizada, com escuta sensível e presença real. Um lugar onde
              o que você sente cabe sem pressa, sem julgamento, sem performance.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-3 bg-moss text-cream rounded-full px-7 py-4 text-sm tracking-wide hover:bg-earth transition-colors duration-500 group"
              >
                Agendar uma conversa
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-moss link-soft"
              >
                Ler o diário
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-6 text-xs text-moss/50 tracking-[0.2em] uppercase">
              <span>CRP-19/004978</span>
              <span className="w-8 h-px bg-moss/30" />
              <span>Fenomenológico-existencial</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[var(--shadow-leaf)]">
              <img
                src={portrait}
                alt="Retrato natural de Milena Modesto"
                className="w-full h-full object-cover"
                width={1080}
                height={1350}
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden md:flex w-44 h-44 bg-cream rounded-full items-center justify-center text-center p-6 shadow-[var(--shadow-soft)]">
              <p className="font-serif text-sm leading-snug text-moss">
                <Leaf size={16} className="mx-auto mb-2 text-earth" />
                "O cuidado começa pela escuta."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APRESENTAÇÃO */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="editorial-eyebrow">Apresentação</p>
          <h2 className="display text-4xl mt-4">Olá, sou Milena.</h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 prose-soft max-w-2xl">
          <p>
            Sou Milena Modesto, psicóloga clínica e hospitalar, e acredito que cada pessoa merece um espaço onde possa ser escutada com acolhimento, respeito e sem julgamentos. <br /><br />
            Meu trabalho é caminhar ao seu lado para compreender sua história, fortalecer seus recursos e construir novas possibilidades diante dos desafios da vida. <br /><br />
          </p>
          <Link to="/sobre" className="mt-8 inline-flex link-soft text-moss text-sm tracking-wide">
            Conhecer minha trajetória →
          </Link>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-paper/60 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
          <div className="max-w-2xl">
            <p className="editorial-eyebrow">Como funciona</p>
            <h2 className="display text-4xl sm:text-5xl mt-4">
              Um percurso simples, no seu tempo.
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-x-12 gap-y-16">
            {passos.map((p) => (
              <div key={p.n} className="border-t border-moss/15 pt-6">
                <span className="font-serif text-2xl text-earth">{p.n}</span>
                <h3 className="font-serif text-2xl mt-3">{p.title}</h3>
                <p className="mt-4 text-moss/70 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="editorial-eyebrow">Acolhimento</p>
          <h2 className="display text-4xl sm:text-5xl mt-4">
            Algumas das paisagens que costumamos atravessar juntos.
          </h2>
          <div className="mt-10 rounded-[2rem] overflow-hidden">
            <img
              src={leaves}
              alt="Folhas de oliveira e sálvia sobre linho"
              className="w-full h-72 object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {areas.map((a) => (
            <div key={a.title}>
              <h3 className="font-serif text-2xl">{a.title}</h3>
              <p className="mt-3 text-moss/70 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative overflow-hidden">
        <img
          src={wash}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12 py-32 text-center">
          <p className="display text-3xl sm:text-4xl lg:text-5xl text-moss leading-tight">
            "Existir é, talvez, o mais simples e o mais difícil.
            <br />
            A clínica é o espaço onde isso pode ser, enfim, dito."
          </p>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="editorial-eyebrow">Diário</p>
            <h2 className="display text-4xl sm:text-5xl mt-4 max-w-xl">
              Reflexões sobre existir, sentir e cuidar.
            </h2>
          </div>
          <Link to="/blog" className="text-sm tracking-wide link-soft text-moss">
            Ver todos os textos →
          </Link>
        </div>

        {loadingPosts ? (
          <div className="grid md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[1.5rem] border border-moss/10 bg-white"
              >
                <div className="aspect-[4/5] animate-pulse bg-moss/10" />
                <div className="p-7 space-y-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-moss/10" />
                  <div className="h-7 w-5/6 animate-pulse rounded bg-moss/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-moss/10" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-moss/10" />
                </div>
              </div>
            ))}
          </div>
        ) : postsError ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-rose-700">
            {postsError}
          </div>
        ) : latestPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-moss/20 bg-white/70 px-6 py-16 text-center">
            <ImageOff className="mx-auto text-earth" size={36} />
            <p className="mt-5 text-lg font-medium text-moss">Nenhum texto publicado ainda.</p>
            {/* <p className="mt-2 text-sm leading-7 text-slate-600">
              Assim que houver posts no Supabase, eles aparecerão aqui automaticamente.
            </p> */}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {latestPosts.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block hover-lift rounded-[1.5rem] overflow-hidden bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  {p.img_thumb ? (
                    <img
                      src={p.img_thumb}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-leaf/50 to-paper">
                      <ImageOff className="text-earth/60" size={28} />
                    </div>
                  )}
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-earth/75">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      {formatBlogDate(p.created_at)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {estimateReadingTime(p.content)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl mt-4 leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm text-moss/65 leading-relaxed line-clamp-3">
                    {createExcerpt(p.content)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-6 lg:px-12 pb-32">
        <div className="rounded-[2.5rem] bg-moss text-cream px-8 sm:px-16 py-20 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-96 h-96 blob opacity-20"
            style={{ background: "var(--leaf)" }}
          />
          <p className="editorial-eyebrow text-leaf">Quando quiser começar</p>
          <h2 className="display text-cream text-4xl sm:text-5xl mt-5 max-w-2xl mx-auto">
            Há um ritmo possível para você. Vamos encontrá-lo juntos.
          </h2>
          <Link
            to="/contato"
            className="mt-10 inline-flex items-center gap-3 bg-cream text-moss rounded-full px-8 py-4 text-sm tracking-wide hover:bg-leaf transition-colors duration-500"
          >
            Agendar uma conversa
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
