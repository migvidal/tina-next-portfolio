"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import * as React from "react";
import { imageSchema } from "./image-schema";
import Image from "next/image";
import {
  PageBlocksTranslation_Services,
  PageBlocksTranslation_ServicesService_Object,
} from "../../tina/__generated__/types";

const TranslationService = ({ service }: { service: PageBlocksTranslation_ServicesService_Object }) => {
  let imageHeight = (service.image?.height ?? "100") + "px";
  return (
    <div className="max-w-sm flex flex-col sm:gap-4 items-center">
      {service.image &&
        <div
          data-tina-field={tinaField(service.image, "src")}
          style={{ height: imageHeight }}
        >
          <Image
            style={{
              objectFit: (service.image.adjustment as "contain" | "cover" | "fill" | "none" | "scale-down") ?? "contain",
              height: imageHeight,
            }}
            alt={service.image.alt}
            src={service.image.src}
            width={parseInt(imageHeight)}
            height={parseInt(imageHeight)}
          />
        </div>}
      {service.title &&
        <h4
          data-tina-field={tinaField(service, "title")}
          className="font-bold text-xl"
        >
          {service.title}
        </h4>}
      <ul className="list-disc list-inside w-full"
          data-tina-field={tinaField(service, "bulletpoints")}>
        {service.bulletpoints &&
          service.bulletpoints.map((bullet, index) =>
            <li key={index}>{bullet.text}</li>,
          )
        }
      </ul>
    </div>

  );
};

export const TranslationServices = ({ data }: { data: PageBlocksTranslation_Services }) => {
  return (
    <Section className="px-8">

      <div
        data-tina-field={tinaField(data)}
        className="flex-1 flex flex-col gap-6 items-center lg:text-left mx-auto"
        style={{ flexBasis: "16rem" }}
      >
        {data.title && (
          <h3
            data-tina-field={tinaField(data, "title")}
            className="text-2xl font-semibold title-font"
          >
            {data.title}
          </h3>
        )}
        {data.introduction && (
          <div
            data-tina-field={tinaField(data, "introduction")}
            className="text-base opacity-80 leading-relaxed"
          >
            <TinaMarkdown content={data.introduction} />
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-center gap-16">
          {data.service_object &&
            data.service_object.map(function(service, i) {
              return <TranslationService key={i} service={service} />;
            })
          }
        </div>
      </div>

    </Section>
  );
};

const defaultTranslationService = {
  title: "Services I offer",
  introduction: "Small paragraph as an introduction to the services",
};

export const translationServiceBlockSchema = {
  label: "Translation services",
  name: "translation_services",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: defaultTranslationService,
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Introduction",
      name: "introduction",
      type: "rich-text",
    },
    {
      label: "Services",
      name: "service_object",
      type: "object",
      list: true,
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
        },
        imageSchema,
        {
          label: "Bulletpoints",
          name: "bulletpoints",
          type: "object",
          list: true,
          fields: [
            {
              label: "Text",
              name: "text",
              type: "string",
            },
            {
              label: "Explanation dialog",
              name: "dialog",
              type: "object",
              fields: [
                {
                  label: "Link text",
                  name: "link",
                  type: "string",
                },
                {
                  label: "Title",
                  name: "title",
                  type: "string",
                },
                {
                  label: "Content",
                  name: "content",
                  type: "rich-text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
