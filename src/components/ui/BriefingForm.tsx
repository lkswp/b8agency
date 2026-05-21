"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";

export default function BriefingForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    revenue: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.substring(0, 11);

    let formattedValue = "";
    if (value.length > 0) {
      formattedValue = "(" + value.substring(0, 2);
    }
    if (value.length > 2) {
      formattedValue += ") " + value.substring(2, 7);
    }
    if (value.length > 7) {
      formattedValue += "-" + value.substring(7, 11);
    }

    setFormData((prev) => ({ ...prev, phone: formattedValue }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API request latency
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      revenue: "",
      message: "",
    });
    setIsSuccess(false);
  };

  return (
    <section id="contato" className="py-24 md:py-32 relative bg-[#0A0A0B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column Text Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="self-start px-3 py-1 rounded-full border border-zinc-800 bg-[#121214]/50 text-[10px] font-bold tracking-wider text-[#00F2FE] uppercase">
              Contato & Briefing
            </span>
            <h2 className="font-title font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Vamos Iniciar Sua Escala
            </h2>
            <p className="text-zinc-400 font-medium leading-relaxed">
              Preencha o formulário ao lado com as informações da sua empresa. Nossa equipe comercial analisará suas respostas e entrará em contato nas próximas 2 horas.
            </p>

            <div className="flex flex-col gap-6 mt-6">
              {/* WhatsApp Item */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#00F2FE] group-hover:border-[#00F2FE]/40 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.161.001 6.136 1.233 8.375 3.474 2.241 2.241 3.471 5.211 3.47 8.378-.004 6.535-5.33 11.859-11.861 11.859-2.002-.001-3.972-.51-5.741-1.488L0 24zm6.163-3.411c1.657.983 3.284 1.503 4.887 1.504 5.385.002 9.774-4.385 9.777-9.77.002-2.607-1.011-5.059-2.859-6.908C16.275 3.565 13.824 2.55 11.2 2.548c-5.386 0-9.772 4.384-9.775 9.769-.001 1.764.471 3.407 1.408 4.905L1.879 21.9l4.341-1.311zM17.47 14.65c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.8.99-.98 1.19-.18.21-.37.24-.69.08-.31-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.18-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.56.16-.18.21-.31.32-.51.11-.21.05-.39-.02-.55-.07-.17-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54-.19-.01-.4-.01-.61-.01-.21 0-.55.08-.84.4-.29.32-1.1.1.08-1.1 2.4 0 2.52.84 2.84 1.22.32.37 2.44 3.73 5.92 5.23.83.36 1.47.57 1.98.73.84.27 1.61.23 2.21.14.67-.1 2.08-.85 2.37-1.67.29-.83.29-1.54.21-1.68-.08-.15-.3-.24-.62-.4z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                    WhatsApp Comercial
                  </span>
                  <a href="https://wa.me/5511999998888" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-[#00F2FE] transition-colors">
                    +55 (11) 99999-8888
                  </a>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#00F2FE] group-hover:border-[#00F2FE]/40 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                    E-mail Corporativo
                  </span>
                  <a href="mailto:contato@b8audiovisual.com.br" className="text-sm font-bold text-white hover:text-[#00F2FE] transition-colors">
                    contato@b8audiovisual.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form Container */}
          <div className="lg:col-span-7 bg-[#121214]/80 border border-zinc-800/50 rounded-2xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden min-h-[500px] flex items-center shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500" htmlFor="fullname">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-950/50 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors ${
                          errors.fullname ? "border-red-500" : "border-zinc-800/80 focus:border-[#00F2FE]"
                        }`}
                        placeholder="Ex: Lucas Ferreira"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500" htmlFor="email">
                        E-mail Profissional
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-950/50 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors ${
                          errors.email ? "border-red-500" : "border-zinc-800/80 focus:border-[#00F2FE]"
                        }`}
                        placeholder="nome@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* WhatsApp */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500" htmlFor="phone">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full bg-zinc-950/50 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors ${
                          errors.phone ? "border-red-500" : "border-zinc-800/80 focus:border-[#00F2FE]"
                        }`}
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    {/* Faturamento */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500" htmlFor="revenue">
                        Faturamento Mensal
                      </label>
                      <select
                        name="revenue"
                        id="revenue"
                        value={formData.revenue}
                        onChange={handleInputChange}
                        className={`w-full bg-zinc-950/50 border rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors appearance-none ${
                          errors.revenue ? "border-red-500" : "border-zinc-800/80 focus:border-[#00F2FE]"
                        }`}
                      >
                        <option value="" disabled>
                          Selecione o faturamento...
                        </option>
                        <option value="under-10k" className="bg-[#121214]">Até R$ 10.000 / mês</option>
                        <option value="10k-50k" className="bg-[#121214]">R$ 10.000 a R$ 50.000 / mês</option>
                        <option value="50k-200k" className="bg-[#121214]">R$ 50.000 a R$ 200.000 / mês</option>
                        <option value="over-200k" className="bg-[#121214]">Acima de R$ 200.000 / mês</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500" htmlFor="message">
                      Qual o objetivo do seu negócio?
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-zinc-950/50 border rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-colors resize-none ${
                        errors.message ? "border-red-500" : "border-zinc-800/80 focus:border-[#00F2FE]"
                      }`}
                      placeholder="Fale brevemente sobre o seu nicho e principais metas de marketing..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative flex items-center justify-center gap-2 w-full mt-2 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#0A0A0B] bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/10 focus:outline-none"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#0A0A0B] border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Enviar Briefing & Falar com Especialista
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="w-full flex flex-col items-center text-center gap-6 py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={32} className="animate-[scaleIn_0.3s_ease]" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-title font-black text-2xl text-white">
                      Briefing Enviado com Sucesso!
                    </h3>
                    <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
                      Nossa equipe comercial já recebeu as suas respostas. Entraremos em contato via WhatsApp dentro das próximas 2 horas.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950/50 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-900 transition-colors"
                  >
                    Enviar Outra Resposta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
