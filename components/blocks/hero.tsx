"use client";
import * as React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { Actions } from "./actions";
import MermaidElement from "../mermaid-renderer";
import { imageSchema } from "./image-schema";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <Container
        size="small"
        width="small"
      >
        <div className="container text-center md:text-left">
          <div className="grid grid-cols-12">
            <div className="col-span-12 sm:col-span-6">
              {data.title && (
                <h1
                  data-tina-field={tinaField(data, "title")}
                  className="w-full relative text-5xl font-extrabold tracking-normal leading-tight title-font inflatableFont"
                >
                  {data.title}
                  <span className="absolute w-full h-full left-0 top-0 rounded-full -z-1 bg-current opacity-7"></span>
                </h1>
              )}
              {data.subtitle && (
                <h3
                  data-tina-field={tinaField(data, "subtitle")}
                  className={"relative inline-block text-lg font-extrabold tracking-wide title-font z-20"}
                >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses["blue"]
                }`}
              >
                {data.subtitle}
              </span>
                </h3>
              )}
              {data.body && (
                <div
                  data-tina-field={tinaField(data, "body")}
                  className={`prose prose-lg mx-auto md:mx-0 mb-10 ${
                    data.color === "primary"
                      ? `prose-primary`
                      : `dark:prose-dark`
                  }`}
                >
                  <TinaMarkdown
                    content={data.body}
                    components={{
                      mermaid({ value }) {
                        return <MermaidElement value={value} />;
                      },
                    }}
                  />
                </div>
              )}
              {data.actions && (
                <div className="mt-10">
                  <Actions
                    className="py-2"
                    parentColor={data.color}
                    actions={data.actions}
                  />
                </div>
              )}
            </div>
            <div className="col-span-12 sm:col-span-6">
              <div className="md:relative -mt-20 md:-mt-40">
                {data.image && (
                  <div
                    data-tina-field={tinaField(data.image, "src")}
                    className="w-full h-auto rounded-lg mx-auto hidden md:block absolute md:opacity-100 md:hover:opacity-0 transition-opacity duration-1000"
                  >
                    <Image
                      style={{ objectFit: "cover" }}
                      alt={data.image.alt}
                      src={data.image.src}
                      width={500}
                      height={500}
                    />
                  </div>
                )}
                {data.image_on_hover && (
                  <div
                    data-tina-field={tinaField(data.image, "src")}
                    className="mx-auto block md:absolute md:opacity-0 md:hover:opacity-100 transition-opacity duration-1000"
                  >
                    <Image
                      style={{ objectFit: "cover" }}
                      alt={data.image_on_hover.alt}
                      src={data.image_on_hover.src}
                      width={500}
                      height={500}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

// @ts-ignore
// @ts-ignore
export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      title: "This is a Hero section",
      subtitle: "This is a subtitle",
      body: "A small paragraph with more information",
    },
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Subtitle",
      name: "subtitle",
      type: "string",
    },
    {
      label: "Body text",
      name: "body",
      type: "rich-text",
    },
    {
      name: "actions",
      type: "object",
      label: "Actions",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          label: "Icon",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
    //@ts-ignore
    imageSchema,
    {
      type: "object",
      label: "Image on mouse hover",
      name: "image_on_hover",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
