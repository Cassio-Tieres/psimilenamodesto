import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="editorial-eyebrow">Um espaço para respirar</p>
          <h3 className="font-serif text-3xl mt-3 leading-tight max-w-md">
            Milena Modesto
            <span className="block text-moss/60 text-xl mt-1">Psicóloga clínica · CRP-19/004978</span>
          </h3>
        </div>

        <div className="md:col-span-3">
          <p className="editorial-eyebrow mb-4">Navegação</p>
          <ul className="space-y-3 text-sm text-moss/70">
            <li><Link to="/sobre" className="link-soft">Sobre</Link></li>
            <li><Link to="/psicoterapia" className="link-soft">Psicoterapia</Link></li>
            <li><Link to="/blog" className="link-soft">Diário</Link></li>
            <li><Link to="/contato" className="link-soft">Contato</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="editorial-eyebrow mb-4">Encontre</p>
          <ul className="space-y-3 text-sm text-moss/70">
            <li>Atendimento online · Brasil & Exterior</li>
            <li><a href="mailto:psimilenamodesto@gmail.com" className="link-soft">psimilenamodesto@gmail.com</a></li>
            <li>
              <a href="https://instagram.com/psimilenamodesto" className="link-soft">Instagram</a>
              <span className="mx-2 text-moss/30">·</span>
              <a href="https://wa.me/5579999536112" className="link-soft">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-moss/50">
          <span>© {new Date().getFullYear()} Milena Modesto. Todos os direitos reservados.</span>
          <span className="mt-2 sm:mt-0 tracking-[0.25em] uppercase">Abordagem fenomenológico-existencial</span>
        </div>
      </div>
    </footer>
  );
}
