"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Video, TrendingUp, Sparkles, Building } from "lucide-react";

interface SpotlightCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

function SpotlightCard({ icon, title, description, delay }: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl bg-zinc-800/30 p-[1px] transition-all duration-300"
    >
      {/* Spotlight Border Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(0, 242, 254, 0.45) 0%, rgba(79, 172, 254, 0.15) 50%, transparent 100%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Internal Content Container */}
      <div className="relative bg-[#121214]/90 rounded-[15px] p-8 h-full flex flex-col gap-5 z-10 backdrop-blur-md">
        {/* Icon box with background highlight */}
        <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-[#00F2FE]/50 transition-colors">
          <div className="text-[#00F2FE]">{icon}</div>
        </div>

        <h3 className="font-title font-bold text-lg text-white tracking-tight">
          {title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Video size={24} />,
      title: "Criação & Edição Cinética",
      description:
        "Edições dinâmicas de altíssima retenção visual, ritmo cinematográfico acelerado e narrativas fortes estruturadas para prender a atenção do público nos primeiros segundos.",
      delay: 0.1,
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Tráfego Pago & Performance",
      description:
        "Campanhas otimizadas com foco absoluto em ROI, conversão e previsibilidade de leads qualificados em plataformas líderes como Meta Ads, Google Ads e TikTok Ads.",
      delay: 0.2,
    },
    {
      icon: <Sparkles size={24} />,
      title: "Branding Estratégico",
      description:
        "Construção de identidades corporativas sólidas e posicionamento estético premium. Elevamos a percepção de valor da sua marca frente ao mercado internacional.",
      delay: 0.3,
    },
    {
      icon: <Building size={24} />,
      title: "Marketing Imobiliário Premium",
      description:
        "Estratégias de lançamento imobiliário digital customizadas para o público de alto padrão, gerando conexão emocional e leads qualificados de alta renda.",
      delay: 0.4,
    },
  ];

  return (
    <section id="servicos" className="py-24 md:py-32 relative bg-[#0A0A0B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <span className="px-3 py-1 rounded-full border border-zinc-800 bg-[#121214]/50 text-[10px] font-bold tracking-wider text-[#00F2FE] uppercase">
            Nossos Pilares
          </span>
          <h2 className="font-title font-black text-3xl sm:text-5xl text-white tracking-tight">
            Como Impulsionamos Seu Negócio
          </h2>
          <p className="text-zinc-400 max-w-xl text-base sm:text-lg font-medium leading-relaxed">
            Desenvolvemos ecossistemas estratégicos robustos para atrair, engajar e converter seu público-alvo ideal.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <SpotlightCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
