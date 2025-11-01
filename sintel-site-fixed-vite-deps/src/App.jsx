
import React, { useMemo, useState } from "react";

// SPA React de página única com navegação por hash.
// Paleta inspirada no site chinajack.com
// (primária azul Jack + navy de apoio + cinzas suaves e branco)
const PALETTE = {
  primary: "#00A0E9", // azul Jack
  primaryDark: "#007EC6",
  navy: "#12243A",
  accent: "#19C2FF",
  bg: "#F5F8FC",
  text: "#0F172A",
  border: "#E5EAF1",
};

const CATEGORIES = [
  {
    id: "lockstitch",
    title: "Reta (Lockstitch)",
    blurb:
      "Costura reta de alta precisão para malhas e planos. Economia de energia e motor direct drive.",
    hero: "Precisão, velocidade e estabilidade para a linha básica da confecção.",
    items: [
      {
        name: "Jack A4C",
        highlights: [
          "IA anti-quebra de linha",
          "Ajuste automático conforme o tecido",
          "Painel integrado silencioso",
        ],
      },
      {
        name: "Jack A5E AMH",
        highlights: [
          "Base alongada",
          "Tanque de óleo blindado (sem vazamento)",
          "Motor dual-drive de alta resposta",
        ],
      },
      { name: "Jack A2C", highlights: ["Performance em travetes e cruzetas", "Alta velocidade"] },
    ],
  },
  {
    id: "overlock",
    title: "Overlock",
    blurb:
      "Fechamento e acabamento de malhas com economia de energia e regulagens práticas.",
    hero: "Acabamento perfeito com menor consumo e vibração reduzida.",
    items: [
      {
        name: "Jack E4S",
        highlights: ["Ajuste leve/pesado", "Economia de energia", "Estabilidade em alta rotação"],
      },
      { name: "Jack C4", highlights: ["Ponto consistente", "Fácil manutenção"] },
    ],
  },
  {
    id: "interlock",
    title: "Interlock (Galoneira)",
    blurb:
      "Pontos de cobertura com alta estabilidade para camisetas, polos e esportivos.",
    hero: "Cobertura estável, menor ruído e melhor acabamento.",
    items: [
      { name: "Jack K4", highlights: ["Malhas finas e médias", "Baixa vibração"] },
      { name: "Jack W4", highlights: ["Alta velocidade", "Lubrificação otimizada"] },
    ],
  },
  {
    id: "special",
    title: "Especiais",
    blurb:
      "Máquinas dedicadas: caseadeira, botão, zig-zag, travete, colarete e mais.",
    hero: "Produtividade máxima para operações específicas.",
    items: [
      { name: "Jack JK-T1900G (Travete)", highlights: ["Alta precisão", "Programável"] },
      { name: "Jack JK-T1790G (Caseadeira)", highlights: ["Eletrônica", "Rápida e estável"] },
    ],
  },
  {
    id: "heavy",
    title: "Linha Pesada",
    blurb: "Estruturas reforçadas e transporte potente para materiais espessos e couro.",
    hero: "Costura confiável em materiais exigentes.",
    items: [
      { name: "Jack JK-204", highlights: ["Long arm", "Couro e estofaria"] },
      { name: "Jack JK-865", highlights: ["Alto torque", "Transporte superior"] },
    ],
  },
];

function useRoute() {
  const [route, setRoute] = useState(window.location.hash.replace("#", "") || "home");
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (id) => (window.location.hash = id)];
}

const Logo = () => (
  <div className="flex items-center gap-2 select-none">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9" stroke={PALETTE.primary} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M3 12h9v9" stroke={PALETTE.navy} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <div className="font-bold text-xl" style={{ color: PALETTE.navy }}>Sintel Máquinas</div>
  </div>
);

const Nav = ({ onNavigate, current }) => (
  <header className="w-full sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70" style={{ borderBottom: `1px solid ${PALETTE.border}` }}>
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <Logo />
      <nav className="hidden md:flex items-center gap-6">
        <a href="#home" className={navClass(current === "home")}>Home</a>
        <div className="relative group">
          <span className={navClass(CATEGORIES.map(c=>c.id).includes(current))}>Categorias</span>
          <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-2xl p-2 border" style={{ borderColor: PALETTE.border }}>
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#cat/${c.id}`} className="block px-4 py-2 rounded-xl hover:bg-gray-50 whitespace-nowrap">{c.title}</a>
            ))}
          </div>
        </div>
        <a href="#sobre" className={navClass(current === "sobre")}>Sobre</a>
        <a href="#contato" className={navClass(current === "contato")}>Contato</a>
      </nav>
      <a href="#contato" className="md:inline-flex hidden px-4 py-2 rounded-2xl font-semibold text-white" style={{ background: PALETTE.primary }}>Fale com Especialista</a>
      <button className="md:hidden inline-flex items-center justify-center p-2 rounded-xl border" style={{ borderColor: PALETTE.border }} onClick={() => document.getElementById('mobileMenu').showModal()}>Menu</button>
    </div>
    <dialog id="mobileMenu" className="rounded-2xl w-11/12 max-w-sm border" style={{ borderColor: PALETTE.border }}>
      <div className="p-4 flex items-center justify-between">
        <Logo />
        <button onClick={() => document.getElementById('mobileMenu').close()} className="px-3 py-1 rounded-xl border" style={{ borderColor: PALETTE.border }}>Fechar</button>
      </div>
      <div className="px-4 pb-4 flex flex-col gap-2">
        <a href="#home" className="px-3 py-2 rounded-xl hover:bg-gray-50">Home</a>
        <details className="rounded-xl border" style={{ borderColor: PALETTE.border }}>
          <summary className="px-3 py-2 cursor-pointer">Categorias</summary>
          <div className="flex flex-col p-2">
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`#cat/${c.id}`} className="px-3 py-2 rounded-xl hover:bg-gray-50">{c.title}</a>
            ))}
          </div>
        </details>
        <a href="#sobre" className="px-3 py-2 rounded-xl hover:bg-gray-50">Sobre</a>
        <a href="#contato" className="px-3 py-2 rounded-xl hover:bg-gray-50">Contato</a>
      </div>
    </dialog>
  </header>
);

function navClass(active) {
  return `px-2 py-1 rounded-xl font-medium ${active ? "text-gray-900" : "text-gray-600"}`;
}

const Hero = () => (
  <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${PALETTE.bg} 0%, #ffffff 100%)` }}>
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-16">
      <div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight" style={{ color: PALETTE.navy }}>
          Tecnologia Jack ao alcance da sua confecção
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Site institucional da <strong>Sintel Máquinas</strong> com categorias baseadas nas linhas Jack: Reta, Overlock, Interlock, Especiais e Linha Pesada.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#contato" className="px-5 py-3 rounded-2xl text-white font-semibold" style={{ background: PALETTE.primary }}>Orçar por WhatsApp</a>
          <a href="#cat/lockstitch" className="px-5 py-3 rounded-2xl font-semibold" style={{ border: `2px solid ${PALETTE.primary}`, color: PALETTE.primary }}>Ver categorias</a>
        </div>
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          {[
            "Até 70% menos consumo (direct drive)",
            "IA anti-quebra de linha",
            "Acabamento premium e baixa vibração",
          ].map((t) => (
            <li key={t} className="px-3 py-2 rounded-xl bg-white border" style={{ borderColor: PALETTE.border }}>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div className="absolute -top-10 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: PALETTE.accent }} />
        <div className="relative rounded-3xl shadow-xl border overflow-hidden" style={{ borderColor: PALETTE.border }}>
          <div className="aspect-[4/3] bg-white grid place-items-center">
            <div className="text-center p-6">
              <div className="text-6xl font-black" style={{ color: PALETTE.primary }}>JACK</div>
              <p className="mt-2 text-gray-600">Imagem institucional ilustrativa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CategoryCard = ({ c }) => (
  <a href={`#cat/${c.id}`} className="group block rounded-3xl bg-white border hover:shadow-xl transition-all" style={{ borderColor: PALETTE.border }}>
    <div className="p-6">
      <div className="text-xs font-semibold tracking-wide mb-2" style={{ color: PALETTE.primary }}>{c.title}</div>
      <h3 className="text-xl font-bold mb-2" style={{ color: PALETTE.navy }}>{c.hero}</h3>
      <p className="text-gray-600 mb-4">{c.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {c.items.slice(0, 3).map((i) => (
          <span key={i.name} className="text-xs px-2 py-1 rounded-xl bg-gray-50 border" style={{ borderColor: PALETTE.border }}>{i.name}</span>
        ))}
      </div>
    </div>
    <div className="px-6 pb-6">
      <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: PALETTE.primary }}>
        Ver categoria →
      </span>
    </div>
  </a>
);

const Home = () => (
  <main>
    <Hero />
    <section className="py-12" style={{ background: PALETTE.bg }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6" style={{ color: PALETTE.navy }}>Categorias</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
    <SectionDiferenciais />
  </main>
);

const SectionDiferenciais = () => (
  <section className="py-12">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
      {[
        {
          title: "Atendimento consultivo",
          text: "Ajudamos a escolher a máquina ideal para sua produção e tecido.",
        },
        {
          title: "Entrega com bancada",
          text: "Montagem completa e pronta para uso (onde disponível).",
        },
        {
          title: "Garantia e pós-venda",
          text: "Treinamentos e suporte técnico para manter sua linha produzindo.",
        },
      ].map((b) => (
        <div key={b.title} className="rounded-3xl border bg-white p-6" style={{ borderColor: PALETTE.border }}>
          <h3 className="font-bold text-lg" style={{ color: PALETTE.navy }}>{b.title}</h3>
          <p className="text-gray-600 mt-2">{b.text}</p>
        </div>
      ))}
    </div>
  </section>
);

const CategoryPage = ({ cat }) => (
  <main>
    <section className="py-10" style={{ background: PALETTE.bg }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <a href="#home" className="text-sm" style={{ color: PALETTE.primary }}>← Voltar</a>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2" style={{ color: PALETTE.navy }}>{cat.title}</h1>
            <p className="text-gray-700 mt-2">{cat.hero}</p>
          </div>
          <a href="#contato" className="px-4 py-2 rounded-2xl text-white font-semibold hidden md:inline-flex" style={{ background: PALETTE.primary }}>Solicitar cotação</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {cat.items.map((i) => (
            <div key={i.name} className="rounded-3xl border bg-white overflow-hidden hover:shadow-xl transition-all" style={{ borderColor: PALETTE.border }}>
              <div className="aspect-[4/3] grid place-items-center bg-white">
                <div className="text-center">
                  <div className="text-3xl font-black" style={{ color: PALETTE.primary }}>{i.name}</div>
                  <p className="text-gray-500 text-sm mt-1">Imagem ilustrativa / Espaço para foto do produto</p>
                </div>
              </div>
              <div className="p-5">
                <ul className="text-sm text-gray-700 list-disc ml-5">
                  {i.highlights.map((h) => (
                    <li key={h} className="mb-1">{h}</li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <a href="#contato" className="px-3 py-2 rounded-xl text-white text-sm font-semibold" style={{ background: PALETTE.primary }}>Quero proposta</a>
                  <a href="#contato" className="px-3 py-2 rounded-xl text-sm font-semibold" style={{ border: `2px solid ${PALETTE.primary}`, color: PALETTE.primary }}>Falar no WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <SectionDiferenciais />
  </main>
);

const Sobre = () => (
  <main>
    <section className="py-12" style={{ background: PALETTE.bg }}>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold" style={{ color: PALETTE.navy }}>Sobre a Sintel Máquinas</h1>
        <p className="text-gray-700 mt-4">
          Somos especialistas em máquinas industriais para confecção, com foco em tecnologia, produtividade
          e pós-venda. Trabalhamos com as principais linhas da Jack (Reta, Overlock, Interlock, Especiais e Linha Pesada)
          para atender desde pequenas oficinas até produções de médio porte.
        </p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          <li className="px-3 py-2 rounded-xl bg-white border" style={{ borderColor: PALETTE.border }}>Entrega com bancada completa</li>
          <li className="px-3 py-2 rounded-xl bg-white border" style={{ borderColor: PALETTE.border }}>Treinamento de uso e manutenção</li>
          <li className="px-3 py-2 rounded-xl bg-white border" style={{ borderColor: PALETTE.border }}>Garantia estendida e suporte</li>
          <li className="px-3 py-2 rounded-xl bg-white border" style={{ borderColor: PALETTE.border }}>Condições especiais no cartão em até 12x</li>
        </ul>
      </div>
    </section>
  </main>
);

const Contato = () => (
  <main>
    <section className="py-12" style={{ background: PALETTE.bg }}>
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold" style={{ color: PALETTE.navy }}>Fale com a gente</h1>
        <p className="text-gray-700 mt-3">Estamos prontos para montar a solução ideal para sua oficina.</p>
        <div className="mt-6 rounded-3xl border bg-white p-6" style={{ borderColor: PALETTE.border }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Obrigado! Entraremos em contato por WhatsApp ou e-mail.");
            }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <input className="px-4 py-3 rounded-xl border" style={{ borderColor: PALETTE.border }} placeholder="Nome" required />
            <input className="px-4 py-3 rounded-xl border" style={{ borderColor: PALETTE.border }} placeholder="WhatsApp" required />
            <input className="px-4 py-3 rounded-xl border sm:col-span-2" style={{ borderColor: PALETTE.border }} placeholder="E-mail (opcional)" />
            <select className="px-4 py-3 rounded-xl border" style={{ borderColor: PALETTE.border }} defaultValue="lockstitch">
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <input className="px-4 py-3 rounded-xl border" style={{ borderColor: PALETTE.border }} placeholder="Cidade/UF" />
            <textarea className="px-4 py-3 rounded-xl border sm:col-span-2" style={{ borderColor: PALETTE.border }} placeholder="Descreva sua produção (tecido, volume, operação principal)" rows={4} />
            <button className="px-5 py-3 rounded-2xl text-white font-semibold sm:col-span-2" style={{ background: PALETTE.primary }}>
              Solicitar orçamento
            </button>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="text-center font-semibold sm:col-span-2" style={{ color: PALETTE.primary }}>
              Ou chame no WhatsApp
            </a>
          </form>
        </div>
      </div>
    </section>
  </main>
);

export default function App() {
  const [route] = useRoute();
  const page = useMemo(() => {
    if (route.startsWith("cat/")) {
      const id = route.split("/")[1];
      const cat = CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
      return { id: `cat/${id}`, node: <CategoryPage cat={cat} /> };
    }
    if (route === "sobre") return { id: "sobre", node: <Sobre /> };
    if (route === "contato") return { id: "contato", node: <Contato /> };
    return { id: "home", node: <Home /> };
  }, [route]);

  return (
    <div style={{ color: PALETTE.text }} className="min-h-screen" >
      <Nav current={page.id} />
      {page.node}
      <Footer />
    </div>
  );
}

const Footer = () => (
  <footer className="mt-12 border-t" style={{ borderColor: PALETTE.border }}>
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
      <div>
        <Logo />
        <p className="text-gray-600 mt-3 text-sm">Solução completa em máquinas de costura industriais.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-2" style={{ color: PALETTE.navy }}>Categorias</h4>
        <ul className="space-y-1 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c.id}><a href={`#cat/${c.id}`} className="hover:underline">{c.title}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2" style={{ color: PALETTE.navy }}>Institucional</h4>
        <ul className="space-y-1 text-sm">
          <li><a href="#sobre" className="hover:underline">Sobre</a></li>
          <li><a href="#contato" className="hover:underline">Contato</a></li>
          <li><a href="#home" className="hover:underline">Política de Garantia (ilustrativo)</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2" style={{ color: PALETTE.navy }}>Contato</h4>
        <p className="text-sm text-gray-600">WhatsApp: (00) 00000-0000<br/>E-mail: contato@sintelmaquinas.com.br</p>
        <a href="#contato" className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold" style={{ background: PALETTE.primary }}>Fale conosco</a>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 pb-8">© {new Date().getFullYear()} Sintel Máquinas. Conteúdo ilustrativo.</div>
  </footer>
);
