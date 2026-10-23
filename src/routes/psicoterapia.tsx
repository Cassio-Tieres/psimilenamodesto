import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import cup from "@/assets/therapy-cup.jpg";

export const Route = createFileRoute("/psicoterapia")({
  head: () => ({
    meta: [
      { title: "Psicoterapia Milena Modesto" },
      {
        name: "description",
        content:
          "Como funciona a psicoterapia online: primeira sessão, frequência, duração e dúvidas comuns.",
      },
      { property: "og:title", content: "Psicoterapia Milena Modesto" },
      {
        property: "og:description",
        content: "Sessões online, no seu ritmo, num espaço de escuta sensível.",
      },
    ],
  }),
  component: PsicoterapiaPage,
});

const duvidas = [
  {
    q: "Como é a primeira sessão?",
    a: "Um espaço para nos conhecermos. Você não precisa chegar com nada pronto pode trazer o que quiser, no ritmo que conseguir. Conversamos sobre o que te traz e sentimos juntos se faz sentido seguir.",
  },
  {
    q: "A psicoterapia é online?",
    a: "Sim. Atendo exclusivamente em formato online, por videochamada, com a mesma profundidade do atendimento presencial. Atendo pessoas em diferentes regiões do Brasil e fora dele.",
  },
  {
    q: "Qual a frequência das sessões?",
    a: "Habitualmente, semanal. A regularidade sustenta o processo terapêutico e permite que algo se construa entre os encontros.",
  },
  {
    q: "Quanto tempo dura cada sessão?",
    a: "Cinquenta minutos a uma hora. Um tempo cuidadosamente delineado para que algo possa acontecer sem pressa, mas também sem se diluir.",
  },
  {
    q: "Por quanto tempo vou precisar fazer psicoterapia?",
    a: "Não há resposta única. Cada percurso tem seu próprio tempo. Conversamos sobre isso ao longo do processo, com transparência.",
  },
  {
    q: "Quanto custa uma sessão?",
    a: "O valor é conversado individualmente. Entre em contato para receber as informações com mais detalhes.",
  },
];

function PsicoterapiaPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-20 lg:pt-28 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 fade-up">
          <p className="editorial-eyebrow">Psicoterapia</p>
          <h1 className="display text-5xl sm:text-6xl mt-6 max-w-2xl">
            Um <span className="italic text-earth">tempo</span> para si,
            uma vez por semana.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-moss/70">
            Cinquenta minutos a uma hora para pausar a inércia do cotidiano e habitar, com
            outra pessoa, aquilo que costuma passar despercebido.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-[3rem] overflow-hidden aspect-square">
            <img src={cup} alt="Mãos segurando uma xícara" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* PRIMEIRA SESSÃO + DETALHES */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 py-24 grid lg:grid-cols-12 gap-x-12 gap-y-16">
        {[
          { eye: "Primeira sessão", t: "Sem necessidade de preparar nada.", d: "Você chega como está. Conversamos sobre o que te traz, e construímos juntos um ritmo possível para o processo." },
          { eye: "Online", t: "No conforto do seu espaço.", d: "Atendimento por videochamada segura. Você precisa apenas de um lugar tranquilo, fones e conexão estável." },
          { eye: "Frequência", t: "Encontros semanais.", d: "A regularidade é o que sustenta a profundidade do trabalho terapêutico ao longo do tempo." },
          { eye: "Duração", t: "Cinquenta minutos a uma hora.", d: "Um tempo cuidadoso, com início e fim claros, para que o que se diz tenha onde se assentar." },
        ].map((x, i) => (
          <div key={i} className={`lg:col-span-6 ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}>
            <p className="editorial-eyebrow">{x.eye}</p>
            <h3 className="font-serif text-3xl mt-3">{x.t}</h3>
            <p className="mt-4 text-moss/70 leading-relaxed max-w-md">{x.d}</p>
          </div>
        ))}
      </section>

      {/* DÚVIDAS formato editorial */}
      <section className="bg-paper/70 grain">
        <div className="mx-auto max-w-5xl px-6 lg:px-12 py-28">
          <div className="max-w-2xl mb-16">
            <p className="editorial-eyebrow">Dúvidas comuns</p>
            <h2 className="display text-4xl sm:text-5xl mt-4">
              Algumas perguntas que costumam chegar antes da primeira sessão.
            </h2>
          </div>

          <div className="divide-y divide-moss/15">
            {duvidas.map((d) => (
              <div key={d.q} className="py-8 grid md:grid-cols-12 gap-6">
                <h3 className="md:col-span-5 font-serif text-xl text-moss">{d.q}</h3>
                <p className="md:col-span-7 text-moss/70 leading-relaxed">{d.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 lg:px-12 py-28 text-center">
        <p className="display text-3xl sm:text-4xl text-moss leading-snug">
          Quando estiver pronto, eu estarei aqui.
        </p>
        <Link
          to="/contato"
          className="mt-10 inline-flex items-center gap-3 bg-moss text-cream rounded-full px-8 py-4 text-sm tracking-wide hover:bg-earth transition-colors duration-500"
        >
          Agendar uma conversa
        </Link>
      </section>
    </SiteLayout>
  );
}
