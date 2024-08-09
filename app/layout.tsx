import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { twMerge } from "tailwind-merge";
import NavBar from "./nav-bar";
import CreateChoreBtn from "./create-chore-btn";
import QueryProvider from "@/middleware/query-provider";
import ThemeProvider from "@/middleware/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chore Shuffler",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <Analytics />
      <SpeedInsights />
      <body className={twMerge(inter.className, "dark:bg-black")}>
        <QueryProvider>
          <ThemeProvider>
            <NavBar />
            {children}
            <CreateChoreBtn />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
