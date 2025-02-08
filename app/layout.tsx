import "../styles.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { Nunito } from "next/font/google";
import { Metadata } from "next";
import client from "../tina/__generated__/client";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Tina",
  description: "Tina Cloud Starter",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });
  const global = globalQuery.data.global;

  return (
    <html lang="en" suppressHydrationWarning className={nunito.className}>
      <body
        className="min-h-screen flex flex-col antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          forcedTheme={global.theme.darkMode}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
