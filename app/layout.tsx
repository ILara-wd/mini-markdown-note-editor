import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { DocumentsProvider } from "@/contexts/DocumentsContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Notion Clone - Gestión de Documentos",
  description: "Aplicación simplificada inspirada en Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <DocumentsProvider>
            {children}
          </DocumentsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
