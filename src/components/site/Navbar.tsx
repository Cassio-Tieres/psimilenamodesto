import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/psicoterapia", label: "Psicoterapia" },
  { to: "/blog", label: "Diário" },
  { to: "/contato", label: "Contato" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-xl tracking-tight text-moss">Milena Modesto</span>
          <span className="hidden sm:inline text-[0.65rem] tracking-[0.3em] uppercase text-caramel">Psicóloga</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-moss" }}
              inactiveProps={{ className: "text-moss/55" }}
              className="text-sm tracking-wide link-soft"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contato"
          className="hidden md:inline-flex items-center text-sm tracking-wide text-cream bg-moss px-5 py-2.5 rounded-full hover:bg-earth transition-colors duration-500"
        >
          Agendar
        </Link>

        <button
          aria-label="Abrir menu"
          className="md:hidden text-moss"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <nav className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base text-moss/80"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center text-sm text-cream bg-moss px-5 py-3 rounded-full"
            >
              Agendar uma conversa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
