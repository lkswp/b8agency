"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Serviços", href: "#servicos" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md bg-[#0A0A0B]/70 py-4 border-b border-zinc-800/50"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo B8 */}
          <a href="#home" className="flex items-center gap-3 group" aria-label="B8 Home">
            <svg
              className="w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]"
              viewBox="0 0 160 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="
                  M 25,20 H 60 C 72,20 80,28 80,40 C 80,50 74,58 65,62 C 76,66 82,75 82,88 C 82,100 72,110 60,110 H 25 Z
                  M 82,40 C 82,28 92,20 104,20 C 116,20 126,28 126,40 C 126,50 120,58 111,62 C 120,66 126,75 126,88 C 126,100 116,110 104,110 C 92,110 82,100 82,88 Z
                  M 37,31 V 51 H 55 C 60,51 64,47 64,41 C 64,35 60,31 55,31 Z
                  M 37,75 V 95 H 57 C 62,95 66,91 66,85 C 66,79 62,75 57,75 Z
                  M 104,32 C 99,32 95,36 95,41 C 95,46 99,50 104,50 C 109,50 113,46 113,41 C 113,36 109,32 104,32 Z
                  M 104,76 C 99,76 95,80 95,85 C 95,90 99,94 104,94 C 109,94 113,90 113,85 C 113,80 109,76 104,76 Z
                "
                fill="#F9F9F9"
              />
              <path
                d="M 80,53 Q 80,63 90,63 Q 80,63 80,73 Q 80,63 70,63 Q 80,63 80,53 Z"
                fill="#1D84DC"
              />
            </svg>
            <div className="font-title font-extrabold text-xl tracking-tight text-white flex flex-col leading-none">
              B8
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00F2FE] font-sans font-semibold">
                Audiovisual
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative text-sm text-zinc-400 font-medium transition-colors hover:text-white group py-2"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contato"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-xs font-semibold uppercase tracking-wider text-white rounded-full group bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] hover:text-[#0A0A0B] focus:ring-4 focus:outline-none focus:ring-blue-800 transition-all duration-300"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-[#0A0A0B] rounded-full group-hover:bg-opacity-0 font-sans">
                Falar com Especialista
              </span>
            </a>
          </div>

          {/* Mobile Menu Open Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none p-1.5 rounded-md hover:bg-zinc-900/50 transition-colors"
            aria-label="Abrir Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-[#0A0A0B]/98 backdrop-blur-lg z-40 flex flex-col justify-center items-center gap-8 md:hidden border-t border-zinc-800/50"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={link.name}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl text-zinc-400 font-semibold transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold uppercase tracking-wider text-white rounded-full group bg-gradient-to-br from-[#00F2FE] to-[#4FACFE] hover:text-[#0A0A0B] transition-all duration-300"
              >
                <span className="relative px-6 py-3 transition-all ease-in duration-200 bg-[#0A0A0B] rounded-full group-hover:bg-opacity-0 font-sans">
                  Falar com Especialista
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
