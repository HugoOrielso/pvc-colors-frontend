import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pinturas pvc colors",
  icons: {
    icon: "/assets/logo.webp",
  },
  description: "Sistema de gestión de ventas para Pvc Colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >

      <body cz-shortcut-listen="true" suppressHydrationWarning className="min-h-full flex flex-col font-poppins ">
        {/* <WompiScriptLoader/> */}
        <Toaster richColors />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
