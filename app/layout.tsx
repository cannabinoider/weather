import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context"; 

export const metadata: Metadata = {
  title: "Weathering With You",
  description: "One solution for weather",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProvider> 
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
