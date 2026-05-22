"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Heart, MessageCircle, ArrowUpRight } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface Reel {
  id: string;
  videoUrl: string;
  views: string;
  likes: string;
  comments: string;
  caption: string;
  link: string;
}

const RECENT_REELS: Reel[] = [
  {
    id: "reel-1",
    videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d8c30af37fa055530944f41&profile_id=139&oauth2_token_id=57447761",
    views: "142K",
    likes: "5.8K",
    comments: "204",
    caption: "Como capturar a atenção nos primeiros 3 segundos do feed. O segredo da retenção.",
    link: "https://www.instagram.com/b8agencia/",
  },
  {
    id: "reel-2",
    videoUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=6f41161858328eb48d6cc86d525ad21c97a80b06&profile_id=165&oauth2_token_id=57447761",
    views: "98K",
    likes: "3.9K",
    comments: "118",
    caption: "Setup de iluminação e câmeras para produções corporativas premium.",
    link: "https://www.instagram.com/b8agencia/",
  },
  {
    id: "reel-3",
    videoUrl: "https://player.vimeo.com/external/517616650.sd.mp4?s=d00ca36e57929a5089307d896c2e3a1d95c18e19&profile_id=165&oauth2_token_id=57447761",
    views: "310K",
    likes: "14.2K",
    comments: "412",
    caption: "Direção de fotografia de luxo no marketing imobiliário de alta renda.",
    link: "https://www.instagram.com/b8agencia/",
  },
  {
    id: "reel-4",
    videoUrl: "https://player.vimeo.com/external/384761655.sd.mp4?s=382aede9b54d6fa210777598c0d16df9f99f2b34&profile_id=165&oauth2_token_id=57447761",
    views: "185K",
    likes: "7.6K",
    comments: "193",
    caption: "Edição cinética e sound design que transformam scrolls em faturamento.",
    link: "https://www.instagram.com/b8agencia/",
  },
];

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (shouldReduceMotion) return;
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay prevented:", err);
        });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // reset video to start frame
      setIsPlaying(false);
    }
  };

  return (
    <a
      href={reel.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block aspect-[9/16] w-full bg-zinc-950 rounded-2xl border border-zinc-900/60 hover:border-[#00F2FE]/50 overflow-hidden transform-gpu transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,242,254,0.12)] will-change-transform"
    >
      {/* Dark vignette gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/95 z-10 pointer-events-none" />
      
      {/* Reel looping video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700 rounded-2xl z-0"
      />

      {/* Cinematic CRT Scanlines/Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

      {/* Floating Views Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-900/80 text-[9px] font-bold text-zinc-300 font-mono tracking-wider">
        <Play size={8} className="fill-white text-white" />
        <span>{reel.views} VIEWS</span>
      </div>

      {/* Floating Center Action Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className={`w-12 h-12 rounded-full border border-zinc-800 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#00F2FE] shadow-[0_0_20px_rgba(0,0,0,0.6)] group-hover:scale-110 group-hover:border-[#00F2FE]/50 group-hover:text-white transition-all duration-500 ${isPlaying ? "opacity-0 scale-90" : "opacity-100"}`}>
          <Play size={16} className="fill-[#00F2FE] ml-0.5 group-hover:fill-white transition-colors" />
        </div>
      </div>

      {/* Bottom Information (Subtitle & Stats) */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col gap-3 transform-gpu translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[11px] font-medium text-zinc-300 leading-snug tracking-wide line-clamp-2">
          {reel.caption}
        </p>

        {/* Dynamic Engagement Stats */}
        <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 text-[10px] font-mono text-zinc-500 font-bold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart size={12} className="fill-transparent group-hover:fill-red-500/10 group-hover:text-red-500 transition-all duration-300" />
              {reel.likes}
            </span>
            <span className="flex items-center gap-1 hover:text-[#00F2FE] transition-colors">
              <MessageCircle size={12} />
              {reel.comments}
            </span>
          </div>
          
          <span className="text-[8px] text-zinc-600 tracking-wider">
            @B8AGENCIA
          </span>
        </div>
      </div>
    </a>
  );
}

export default function InstagramFeed() {
  return (
    <div className="w-full py-12 border-t border-zinc-900/60 mt-12 mb-4 transform-gpu">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FE] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            Social Hub
          </span>
          <h3 className="font-title font-black text-xl md:text-2xl text-white tracking-tight flex items-center gap-2">
            ÚLTIMOS VÍDEOS // <span className="text-zinc-500">@B8AGENCIA</span>
          </h3>
        </div>

        {/* Follow CTA */}
        <a
          href="https://instagram.com/b8agencia"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 hover:bg-zinc-900/50 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#00F2FE] transition-all duration-300 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <InstagramIcon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#00F2FE] transition-colors" />
          Seguir no Instagram
          <ArrowUpRight size={14} className="text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Grid of Reels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECENT_REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  );
}
