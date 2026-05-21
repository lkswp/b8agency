"use client";

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
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

          {/* Social Icons Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00F2FE] hover:border-[#00F2FE]/50 hover:shadow-[0_0_12px_rgba(0,242,254,0.15)] transition-all duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00F2FE] hover:border-[#00F2FE]/50 hover:shadow-[0_0_12px_rgba(0,242,254,0.15)] transition-all duration-300"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
              </svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00F2FE] hover:border-[#00F2FE]/50 hover:shadow-[0_0_12px_rgba(0,242,254,0.15)] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" className="w-[18px] h-[18px]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" radius="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-zinc-900 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Agência B8 Audiovisual. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Políticas de Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
