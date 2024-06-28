import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import CreateEditScheduleEntryDialog from "@/components/dialogs/create-edit-schedule-entry";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NavTabs from "./nav-tabs";
import { twMerge } from "tailwind-merge";

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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <nav className="flex items-center border-box justify-between p-4 px-8 bg-neutral-900 border-b border-neutral-800">
            <div className="text-lg font-bold">Chore Shuffler</div>
            <CreateEditScheduleEntryDialog
              trigger={
                <Button className="w-fit flex gap-2">
                  <Plus className="h-4 w-4" />
                  Create a schedule entry
                </Button>
              }
            />
          </nav>
          <NavTabs />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
