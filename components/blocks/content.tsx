"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import MermaidElement from "../mermaid-renderer";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faFile } from "@fortawesome/free-solid-svg-icons";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  let imageSize: number = 200;
  switch (data.pfp?.size) {
    case "md":
      imageSize = 100;
      break;
    case "lg":
      imageSize = 200;
      break;
    case "xl":
      imageSize = 300;
      break;
    case "2xl":
      imageSize = 400;
      break;
  }

  let imageShape: string = "";
  switch (data.pfp?.shape) {
    case "square":
      imageShape = "square";
      break;
    case "rounded":
      imageShape = "rounded-2xl";
      break;
    case "circle":
      imageShape = "rounded-full";
      break;
  }
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        {data.title && <h1 className="text-5xl text-center">{data.title}</h1>}
        <div className="flex flex-wrap items-center justify-center">
          <Image
            data-tina-field={tinaField(data, "pfp")}
            className={`${imageShape} mx-8`}
            style={{
              height: imageSize,
              objectFit: "cover",
            }}
            alt={data.pfp?.alt ?? ""}
            src={data.pfp?.src ?? ""}
            width={imageSize}
            height={imageSize}
          />
          <div className="mx-8">
            {data.resumelink && (
              <div>
                <div
                  className="inline-flex items-center justify-center text-center bg-black rounded text-white h-8 w-8 m-2">
                  <FontAwesomeIcon icon={faFile} />
                </div>
                <Link href={data.resumelink.url ?? "#"} className="link">{data.resumelink.label ?? ""}</Link>
              </div>
            )}
            {
              data.links && (
                data.links.map((link) => (
                  <div>
                    <div
                      className="inline-flex items-center justify-center text-center bg-black rounded text-white h-8 w-8 m-2">
                      <FontAwesomeIcon icon={faLink} />
                    </div>
                    <Link href={link.url ?? "#"} className="link">{link.name ?? ""}</Link>
                  </div>
                ))
              )
            }
          </div>
        </div>
        <TinaMarkdown
          content={data.body ?? ""}
          components={{
            mermaid({ value }) {
              return <MermaidElement value={value} />;
            },
          }}
        />
      </Container>
    </Section>
  )
    ;
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Profile picture",
      name: "pfp",
      type: "object",
      fields: [
        {
          label: "Image Source",
          name: "src",
          type: "image",
        },
        {
          label: "Alt Text",
          name: "alt",
          type: "string",
        },
        {
          label: "Shape",
          name: "shape",
          type: "string",
          options: ["square", "rounded", "circle"],
        },
        {
          label: "Size",
          name: "size",
          type: "string",
          options: ["md", "lg", "xl", "2xl"],
        },
      ],
    },
    {
      label: "Resume link",
      name: "resumelink",
      type: "object",
      fields: [
        {
          label: "Link label",
          name: "label",
          type: "string",
        },
        {
          label: "URL (copy it from the Media Manager) (file must be in the 'resumes' folder)",
          name: "url",
          type: "string",
        },
      ],
    },
    {
      label: "Links",
      name: "links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          label: "Link label",
          name: "name",
          type: "string",
        },
        {
          label: "URL",
          name: "url",
          type: "string",
        },
      ],
    },
    {
      label: "Body",
      name: "body",
      type: "rich-text",
    },
    {
      label: "Color",
      name: "color",
      type: "string",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};