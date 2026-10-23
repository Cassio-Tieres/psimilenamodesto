import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import portrait from "@/assets/portrait-about.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Milena Modesto, psicóloga clínica" },
      {
        name: "description",
        content:
          "Conheça a trajetória, formação e visão clínica de Milena Modesto, psicóloga com abordagem fenomenológico-existencial.",
      },
      { property: "og:title", content: "Sobre Milena Modesto" },
      {
        property: "og:description",
        content: "Trajetória profissional e visão clínica fenomenológico-existencial.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-20 lg:pt-28 pb-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 fade-up">
          <p className="editorial-eyebrow">Sobre</p>
          <h1 className="display text-5xl sm:text-6xl mt-6 max-w-xl">
            Existir é, antes de tudo, ser <span className="italic text-earth">escutado</span>.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/70">
            Sou Milena Modesto, psicóloga clínica e hospitalar, e acredito que cada pessoa merece um espaço onde possa ser escutada com acolhimento, respeito e sem julgamentos. <br /><br />
            Meu trabalho é caminhar ao seu lado para compreender sua história, fortalecer seus recursos e construir novas possibilidades diante dos desafios da vida. <br /><br />
            Atuo pela abordagem fenomenológico-existencial, unindo sensibilidade, ética e compromisso com o cuidado.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden lg:translate-y-12">
            <img
              src={portrait}
              alt="Milena Modesto em luz natural"
              className="w-full h-full object-cover"
              width={1200}
              height={1500}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* TRAJETÓRIA */}
      <section className="mx-auto max-w-6xl px-6 lg:px-12 py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="editorial-eyebrow">Trajetória</p>
        </div>
        <div className="lg:col-span-8 prose-soft">
          <p>
Minha trajetória na Psicologia foi construída a partir do encontro com diferentes formas de cuidado. Formada pela Universidade Federal de Sergipe, posteriormente realizei a Residência Multiprofissional em Saúde da Família e Comunidade pela Universidade Estadual de Montes Claros, experiência que ampliou meu olhar para a saúde mental para além do indivíduo, considerando também seus vínculos, relações e contexto de vida. <br /><br />

Minha formação e experiência profissional passaram por diferentes espaços de cuidado em saúde, incluindo a atenção primária, a atenção especializada e a clínica psicológica. Atualmente, atuo na urgência psiquiátrica, experiência que amplia continuamente meu olhar sobre o sofrimento psíquico e sobre as diferentes formas de cuidado em saúde mental. <br /><br />

Na clínica, encontro na abordagem fenomenológico-existencial uma forma de acompanhar cada história sem respostas prontas, buscando compreender, junto com quem chega, aquilo que está sendo vivido e os sentidos que podem emergir desse processo. É a partir desse olhar que construo meu trabalho: com escuta, presença e respeito à singularidade de cada pessoa.
          </p>
        </div>
      </section>

      {/* VISÃO CLÍNICA assimétrico */}
      <section className="bg-paper/70 grain">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="editorial-eyebrow">Visão clínica</p>
            <h2 className="display text-4xl sm:text-5xl mt-4">
              Cada pessoa carrega um modo único de existir.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 prose-soft">
            <p>
              Não trabalho com fórmulas, técnicas pré-definidas ou diagnósticos como
              ponto de partida. Acredito numa clínica que escuta a experiência tal como
              ela aparece sem reduzir o humano às suas categorias.
            </p>
            <p className="mt-6">
              Isso não significa ausência de método. Significa que o método nasce, a
              cada encontro, do que se desenha entre nós.
            </p>
          </div>
        </div>
      </section>

      {/* ABORDAGEM */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="space-y-8">
            {[
              { t: "Fenomenologia", d: "Partir da experiência vivida, antes de qualquer interpretação." },
              { t: "Existencialismo", d: "Compreender o humano em sua liberdade e em seus limites." },
              { t: "Presença", d: "Estar disponível, real, no encontro com quem chega." },
            ].map((x) => (
              <div key={x.t} className="border-l-2 border-earth/40 pl-6">
                <h3 className="font-serif text-2xl">{x.t}</h3>
                <p className="mt-2 text-moss/70 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
          <p className="editorial-eyebrow">Abordagem</p>
          <h2 className="display text-4xl sm:text-5xl mt-4">
            Fenomenológico-existencial.
          </h2>
          <p className="mt-6 text-lg text-moss/70 leading-relaxed">
            É uma forma de psicoterapia que entende a pessoa como ser-no-mundo, em
            constante construção. Não buscamos consertar buscamos compreender.
            E, no compreender, abrir espaço para outros modos de viver.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-12 pb-32 text-center">
        <p className="display text-3xl sm:text-4xl text-moss leading-snug">
          "Não se trata de tornar a vida mais leve.
          <br />Trata-se de poder carregá-la com mais verdade."
        </p>
        <Link
          to="/contato"
          className="mt-10 inline-flex items-center gap-3 bg-moss text-cream rounded-full px-8 py-4 text-sm tracking-wide hover:bg-earth transition-colors duration-500"
        >
          Conversar comigo
        </Link>
      </section>
    </SiteLayout>
  );
}
