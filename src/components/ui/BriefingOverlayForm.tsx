"use client";

import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { motion, AnimatePresence, Variants, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";

interface FormData {
  nome: string;
  whatsapp: string;
  canal: string;
  servico: string;
  budget: string;
}

const servicos = [
  { id: "shorts", label: "Reels / TikTok / Shorts", desc: "Edição cinética, cortes e retenção extrema" },
  { id: "vsl", label: "VSL / Vídeos de Vendas", desc: "Scripting de alta conversão e audiovisual premium" },
  { id: "promos", label: "Anúncios / Criativos", desc: "Criativos de alto impacto para tráfego pago" },
  { id: "institutional", label: "Vídeo Institucional / Reel", desc: "Posicionamento estético e autoridade de luxo" },
];

const budgets = [
  { id: "low", label: "Até R$ 3.000 /mês", desc: "Início rápido para validar canal" },
  { id: "mid", label: "R$ 3.000 a R$ 7.000 /mês", desc: "Ideal para tração e ritmo diário" },
  { id: "high", label: "R$ 7.000 a R$ 15.000 /mês", desc: "Escala acelerada e máxima retenção" },
  { id: "elite", label: "Acima de R$ 15.000 /mês", desc: "Parceria de elite e direção exclusiva" },
];

const maskPhone = (val: string) => {
  return val
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export default function BriefingOverlayForm() {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    canal: "",
    servico: "",
    budget: "",
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "whatsapp" ? maskPhone(value) : value,
    }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  const selectServico = useCallback((label: string) => {
    setFormData((prev) => ({ ...prev, servico: label }));
    setErrors((prev) => {
      if (!prev.servico) return prev;
      const copy = { ...prev };
      delete copy.servico;
      return copy;
    });
  }, []);

  const selectBudget = useCallback((label: string) => {
    setFormData((prev) => ({ ...prev, budget: label }));
    setErrors((prev) => {
      if (!prev.budget) return prev;
      const copy = { ...prev };
      delete copy.budget;
      return copy;
    });
  }, []);

  const validateStep = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
      if (formData.whatsapp.trim() && formData.whatsapp.length < 14) {
        newErrors.whatsapp = "WhatsApp válido é obrigatório";
      }
      if (!formData.canal.trim()) newErrors.canal = "Instagram/Canal é obrigatório";
    } else if (step === 2) {
      if (!formData.servico) newErrors.servico = "Selecione pelo menos um serviço";
    } else if (step === 3) {
      if (!formData.budget) newErrors.budget = "Selecione uma faixa de orçamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, formData]);

  const handleNext = useCallback(() => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  }, [validateStep]);

  const handleBack = useCallback(() => {
    setStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    // Simulate cinematic dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  }, [validateStep]);

  const triggerWhatsAppRedirect = useCallback(() => {
    const text = encodeURIComponent(
      `Olá B8! Acabei de enviar o briefing no site:\n\n` +
      `👤 Nome: ${formData.nome}\n` +
      `📞 WhatsApp: ${formData.whatsapp}\n` +
      `📱 Instagram/Canal: ${formData.canal}\n` +
      `🎬 Serviço: ${formData.servico}\n` +
      `💰 Orçamento: ${formData.budget}`
    );
    window.open(`https://wa.me/5511999998888?text=${text}`, "_blank");
  }, [formData]);

  const stepVariants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? 50 : -50),
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? -50 : 50),
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] as const },
    }),
  };

  return (
    <div className="w-full bg-[#0a0a0b]/80 border border-zinc-900 rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between min-h-[460px] max-w-xl mx-auto shadow-[0_0_50px_rgba(255,255,255,0.02)] transform-gpu will-change-transform">
      
      {/* Header Stepper */}
      {!isSuccess && (
        <div className="w-full mb-6 transform-gpu">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">
            <span>Passo {step} de 3</span>
            <span className="text-[#00F2FE] font-mono">
              {step === 1 ? "Identificação" : step === 2 ? "Necessidade" : "Escala"}
            </span>
          </div>
          <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] transform-gpu"
            />
          </div>
        </div>
      )}

      {/* Main Content Stepper */}
      <div className="flex-1 flex flex-col justify-center transform-gpu">
        <AnimatePresence mode="wait" custom={step}>
          {!isSuccess ? (
            <motion.div
              key={step}
              custom={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col gap-4 transform-gpu"
            >
              {/* STEP 1: Basic Fields */}
              {step === 1 && (
                <div className="flex flex-col gap-4 transform-gpu">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Ex: Carlos Silva"
                      className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-[#00F2FE] text-white text-xs font-medium focus:outline-none transition-colors"
                    />
                    {errors.nome && <span className="text-[10px] text-red-500 font-bold mt-1">{errors.nome}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                        WhatsApp de Contato <span className="text-zinc-600 font-normal lowercase">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="(11) 99999-9999"
                        className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-[#00F2FE] text-white text-xs font-medium focus:outline-none transition-colors"
                      />
                      {errors.whatsapp && <span className="text-[10px] text-red-500 font-bold mt-1">{errors.whatsapp}</span>}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1.5">
                        Instagram da Marca ou Canal
                      </label>
                      <input
                        type="text"
                        name="canal"
                        value={formData.canal}
                        onChange={handleInputChange}
                        placeholder="@empresa ou Link do YouTube"
                        className="px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-[#00F2FE] text-white text-xs font-medium focus:outline-none transition-colors"
                      />
                      {errors.canal && <span className="text-[10px] text-red-500 font-bold mt-1">{errors.canal}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Service Grid Selection */}
              {step === 2 && (
                <div className="flex flex-col gap-3 transform-gpu">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-0.5">
                    Selecione o Formato Necessário
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicos.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => selectServico(item.label)}
                        className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 transform-gpu ${
                          formData.servico === item.label
                            ? "bg-[#00F2FE]/5 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                            : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800"
                        }`}
                      >
                        <h4 className="text-xs font-bold text-white tracking-wide">{item.label}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  {errors.servico && <span className="text-[10px] text-red-500 font-bold">{errors.servico}</span>}
                </div>
              )}

              {/* STEP 3: Budget Grid Selection */}
              {step === 3 && (
                <div className="flex flex-col gap-3 transform-gpu">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-0.5">
                    Selecione a Verba Estimada
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {budgets.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => selectBudget(item.label)}
                        className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 transform-gpu ${
                          formData.budget === item.label
                            ? "bg-[#00F2FE]/5 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.15)]"
                            : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800"
                        }`}
                      >
                        <h4 className="text-xs font-bold text-white tracking-wide">{item.label}</h4>
                        <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  {errors.budget && <span className="text-[10px] text-red-500 font-bold">{errors.budget}</span>}
                </div>
              )}
            </motion.div>
          ) : (
            /* SUCCESS STATE SCREEN */
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center py-6 gap-5 transform-gpu"
            >
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                className="transform-gpu"
              >
                <CheckCircle2 size={56} className="text-[#00F2FE]" />
              </motion.div>

              <div className="flex flex-col gap-2 transform-gpu">
                <h3 className="font-title font-black text-xl text-white tracking-tight">
                  BRIEFING RECEBIDO COM SUCESSO!
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mx-auto">
                  Os dados foram processados no studio. Clique no botão abaixo para nos enviar os detalhes direto no WhatsApp e iniciar seu projeto imediatamente.
                </p>
              </div>

              <motion.button
                onClick={triggerWhatsAppRedirect}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="relative inline-flex items-center gap-2 px-6 py-4 overflow-hidden rounded-full font-bold uppercase tracking-wider text-[10px] text-[#0A0A0B] bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] shadow-[0_0_20px_rgba(0,242,254,0.2)] hover:shadow-[0_0_30px_rgba(0,242,254,0.45)] group cursor-pointer transform-gpu"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" style={{ animationDuration: "1.5s" }} />
                Iniciar Produção via WhatsApp
                <Send size={12} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons */}
      {!isSuccess && (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-zinc-950 transform-gpu">
          {step > 1 ? (
            <motion.button
              onClick={handleBack}
              whileHover={shouldReduceMotion ? {} : { x: -2 }}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-wider cursor-pointer transform-gpu"
            >
              <ArrowLeft size={12} />
              Voltar
            </motion.button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <motion.button
              onClick={handleNext}
              whileHover={shouldReduceMotion ? {} : { x: 2 }}
              className="flex items-center gap-1.5 text-white hover:text-[#00F2FE] transition-colors text-[10px] uppercase font-bold tracking-wider cursor-pointer ml-auto transform-gpu"
            >
              Avançar
              <ArrowRight size={12} />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0A0A0B] bg-white font-bold text-[10px] uppercase tracking-wider transition-all hover:bg-[#00F2FE] disabled:opacity-50 cursor-pointer ml-auto transform-gpu"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Processando
                </>
              ) : (
                <>
                  Enviar Briefing
                  <Send size={10} />
                </>
              )}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
