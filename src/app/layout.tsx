import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura-Saku Dashboard",
  description: "Expense tracking dashboard for Aura-Saku",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="relative min-h-full flex flex-col bg-[#fbf8ff] text-gray-900">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
