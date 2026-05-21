"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: "videos" | "design" | "estrategia";
  tag: string;
  description: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "videos", name: "Vídeos" },
    { id: "design", name: "Design" },
    { id: "estrategia", name: "Estratégia" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Audiovisual Reel 2026",
      category: "videos",
      tag: "+15M Views",
      description:
        "Edição cinética de altíssima retenção e direção de fotografia para infoprodutos de grande escala.",
    },
    {
      id: 2,
      title: "Lançamento Vista Alta",
      category: "estrategia",
      tag: "Lançamento Esgotado",
      description:
        "Campanha completa de tráfego pago de alta renda para empreendimento imobiliário de luxo.",
    },
    {
      id: 3,
      title: "Rebranding FinTech Velo",
      category: "design",
      tag: "Case de Sucesso",
      description:
        "Redesenho de marca corporativa moderna e desenvolvimento de website institucional institucional.",
    },
    {
      id: 4,
      title: "Black Friday ShopCo",
      category: "estrategia",
      tag: "ROI 8.5x",
      description:
        "Estruturação de funil de conversão completo, copy persuasiva e anúncios em tempo real.",
    },
    {
      id: 5,
      title: "Série Creator Pro",
      category: "videos",
      tag: "+5M Views",
      description:
        "Minidocumentário institucional focado em autoridade digital e engajamento orgânico de marca.",
    },
    {
      id: 6,
      title: "Brand Book Construtora Alfa",
      category: "design",
      tag: "Identidade Forte",
      description:
        "Manual de marca completo e materiais de captação digital de alta sofisticação corporativa.",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="px-3 py-1 rounded-full border border-zinc-800 bg-[#121214]/50 text-[10px] font-bold tracking-wider text-[#00F2FE] uppercase">
            Nosso Portfólio
          </span>
          <h2 className="font-title font-black text-3xl sm:text-5xl text-white tracking-tight">
            Cases de Alto Impacto
          </h2>
          <p className="text-zinc-400 max-w-xl text-base sm:text-lg font-medium leading-relaxed">
            Resultados reais de marcas que escalaram no ambiente digital com a metodologia B8.
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`relative px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors duration-300 focus:outline-none ${
                activeFilter === category.id
                  ? "text-[#0A0A0B]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {/* Sliding Active Indicator Pill */}
              {activeFilter === category.id && (
                <motion.div
                  layoutId="activeFilter"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE]"
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid with Framer Motion AnimatePresence and layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                key={project.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/40 bg-[#121214]/40 backdrop-blur-md hover:border-zinc-700/50 hover:bg-[#121214]/80 transition-all duration-300 h-full"
              >
                {/* Visual placeholder inside card */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950/40 flex items-center justify-center p-6 border-b border-zinc-800/40">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.06)_0%,transparent_70%)] pointer-events-none" />
                  
                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1d84dc]/10 text-[#00F2FE] border border-[#1d84dc]/20">
                    {project.tag}
                  </span>

                  {/* Decorative element resembling video/design interface */}
                  <div className="w-16 h-16 rounded-full border border-zinc-800/50 flex items-center justify-center bg-zinc-900/30 group-hover:scale-110 group-hover:border-[#00F2FE]/50 transition-all duration-500">
                    <ArrowUpRight className="text-zinc-500 group-hover:text-[#00F2FE] transition-colors" size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#4FACFE] uppercase tracking-[0.2em] font-bold">
                      {project.category === "videos"
                        ? "Audiovisual"
                        : project.category === "design"
                        ? "Design System"
                        : "Estratégia & Tráfego"}
                    </span>
                    <h3 className="font-title font-bold text-xl text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-medium mt-1">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-900">
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#00F2FE] transition-colors"
                    >
                      Ver Detalhes do Case
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
