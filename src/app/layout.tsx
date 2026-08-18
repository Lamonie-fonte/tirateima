import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tirateima-two.vercel.app",
  ),
  title: {
    default: "Tira-Teima Cagece — Confira sua conta de água",
    template: "%s | Tira-Teima Cagece",
  },
  description:
    "Digite as leituras do hidrômetro, descubra o consumo em m³ e estime água e esgoto pela tabela oficial da Cagece.",
  applicationName: "Tira-Teima Cagece",
  keywords: [
    "Cagece",
    "conta de água",
    "tarifa Cagece",
    "Fortaleza",
    "Ceará",
  ],
  openGraph: {
    title: "Tira-Teima Cagece",
    description: "Calcule o consumo pela leitura do hidrômetro e estime o valor pela tarifa oficial.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#075da8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
