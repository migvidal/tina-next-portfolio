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
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {service.image &&
        <div
          data-tina-field={tinaField(service.image, "src")}
          className="w-[100px] h-[90px] m-5"
        >
          <Image
            style={{ objectFit: "cover" }}
            alt={service.image.alt}
            src={service.image.src}
            width={50}
            height={50}
          />
        </div>}
      {service.title &&
        <h4
          data-tina-field={tinaField(service, "title")}
          className="font-semibold"
        >
          {service.title}
        </h4>}
      {service.bulletpoints &&
        service.bulletpoints.map((bullet) =>
          // eslint-disable-next-line react/jsx-key
          <ul className="list-disc list-inside">
            <li>{bullet}</li>
          </ul>,
        )
      }
    </div>

  );
};

export const TranslationServices = ({ data }: { data: PageBlocksTranslation_Services }) => {
  return (
    <Section>

      <div
        data-tina-field={tinaField(data)}
        className="flex-1 flex flex-col gap-6 text-center items-center lg:items-start lg:text-left max-w-xl mx-auto"
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
          <p
            data-tina-field={tinaField(data, "introduction")}
            className="text-base opacity-80 leading-relaxed"
          >
            <TinaMarkdown content={data.introduction} />
          </p>
        )}
        <div className="flex flex-row flex-wrap gap-4">
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
  services: {
    title: "This is a service",
    image: "",
    bulletpoints: ["Bulletpoint", "Another bulletpoint"],
  },
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
          type: "string",
          list: true,
        },
      ],
    },
  ],
};
