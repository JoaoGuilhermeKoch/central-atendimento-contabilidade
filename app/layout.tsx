import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Central de Atendimento",
  description: "Central de atendimento e operações para escritório contábil.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
