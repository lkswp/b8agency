import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "B8 | Agência de Marketing Audiovisual & Performance de Elite",
  description:
    "Estratégia de tráfego pago ultra-segmentada, produções audiovisuais cinematográficas e posicionamento de marca de luxo. Escalamos sua agência, empresa ou infoproduto com retorno financeiro previsível.",
  keywords: [
    "agência de marketing",
    "audiovisual premium",
    "tráfego pago",
    "performance de elite",
    "marketing imobiliário",
    "branding estratégico",
    "edição cinética",
  ],
  authors: [{ name: "Agência B8" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://b8audiovisual.com.br",
    title: "B8 | Agência de Marketing Audiovisual & Performance",
    description:
      "Transformamos atenção em faturamento absoluto com estratégias sob medida e produções de altíssimo padrão visual.",
    siteName: "B8 Audiovisual",
  },
  twitter: {
    card: "summary_large_image",
    title: "B8 | Agência de Marketing Audiovisual & Performance",
    description:
      "Transformamos atenção em faturamento absoluto com estratégias sob medida e produções de altíssimo padrão visual.",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="bg-[#0A0A0B] text-[#F9F9F9] font-sans antialiased min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
