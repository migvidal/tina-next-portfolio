"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import NavItems from "./nav-items";
import { useLayout } from "../layout/layout-context";
import { CookiesProvider, useCookies } from "react-cookie";

const primaryHeaderColors = {
  blue: "text-white from-blue-300 to-blue-500",
  teal: "text-white from-teal-400 to-teal-500",
  green: "text-white from-green-400 to-green-500",
  red: "text-white from-red-400 to-red-500",
  pink: "text-white from-pink-400 to-pink-500",
  purple: "text-white from-purple-400 to-purple-500",
  orange: "text-white from-orange-400 to-orange-500",
  yellow: "text-white from-yellow-400 to-yellow-500"
};

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings.header;
  const defaultHeaderColor = `text-black dark:text-white bg-white dark:bg-gray-800 ${header.glass ? "backdrop-blur-xl bg-opacity-35" : ""}`;
  const primaryHeaderGradient = `bg-gradient-to-b ${primaryHeaderColors[theme.color]}`;

  const headerColorCss = header.color === "primary" ? primaryHeaderGradient : defaultHeaderColor;

  return (
    <div
      className={`fixed w-full z-50 overflow-hidden ${headerColorCss}`}
    >
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex flex-wrap sm:flex-nowrap flex-col sm:flex-row items-center sm:justify-between sm:gap-6">
          <h4
            className="select-none text-lg font-bold tracking-tight my-4 sm:mr-20 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(header, "icon")}
                parentColor={header.color}
                data={{
                  name: header.icon.name,
                  color: header.icon.color,
                  style: header.icon.style
                }}
              />{" "}
              <span data-tina-field={tinaField(header, "name")}>
                {header.name}
              </span>
            </Link>
          </h4>
          <div className="flex flex-row items-center justify-between w-full">
            <NavItems navs={header.nav} />
            <LanguageSwitcher className="text-xs px-2 py-1 ml-10 outline outline-1 rounded hover:opacity-45" />
          </div>
        </div>
        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme.darkMode === "primary"
              ? `via-white`
              : `via-black dark:via-white`,
            "to-transparent bottom-0 left-4 right-4 -z-1 opacity-5"
          )}
        />
      </Container>
    </div>
  );
}

function LanguageSwitcher({ className = "" }: { className: string }) {
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  function setLocale(locale: string) {
    setCookie("NEXT_LOCALE", locale);
    location.reload();
  }

  return (
    <CookiesProvider>
      {cookies.NEXT_LOCALE === "es" ? <button className={className} onClick={() => setLocale("en")}>EN</button> :
        <button className={className} onClick={() => setLocale("es")}>ES</button>}
    </CookiesProvider>
  );
}