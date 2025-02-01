"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import * as React from "react";
import { imageSchema } from "./image-schema";
import Image from "next/image";
import {
  PageBlocksTranslation_Services,
  PageBlocksTranslation_ServicesService_Object, PageBlocksTranslation_ServicesService_ObjectBulletpointsDialog,
} from "../../tina/__generated__/types";
import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


const ExplanationDialog = ({ dialog }: { dialog: PageBlocksTranslation_ServicesService_ObjectBulletpointsDialog }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  useLayoutEffect(() => {
    if (isModalOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  });
  return (
    <>
      {dialog.link && <button
        className="underline underline-offset-8 hover:text-cyan-500"
        onClick={() => setModalOpen(true)}>
        {dialog.link}
      </button>}
      <dialog
        ref={dialogRef}
        className="p-8 w-96 rounded-xl bg-theme-light"
        id="dialog"
        onClick={() => setModalOpen(false)}
      >
        <form method="dialog">
          {dialog.title && <p className="font-bold pb-2">{dialog.title}</p>}
          {dialog.content && <TinaMarkdown content={dialog.content} />}
          <button className="my-4 btn btn-primary rounded-full bg-black text-white p-4">OK</button>
        </form>
      </dialog>
    </>
  );
};

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
              height: imageHeight,
            }}
            alt={service.image?.alt ?? ""}
            src={service.image?.src ?? ""}
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
      <ul className="w-full">
        {service.bulletpoints &&
          service.bulletpoints.map((bullet, index) =>
            <li key={index} data-tina-field={tinaField(bullet, "text")} className="flex mb-4 pl-6">
              <FontAwesomeIcon icon={faCheck} className="pr-2 pt-1" />
              <div>
                {bullet.text}
                {bullet.dialog && (
                  <ExplanationDialog dialog={bullet.dialog} />
                )}
              </div>
            </li>,
          )
        }
      </ul>
    </div>

  );
};

export const TranslationServices = ({ data }: { data: PageBlocksTranslation_Services }) => {
  return (
    <Section className="p-8">
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
          {
            data.service_object &&
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
    itemProps: (item) => {
      return { label: item?.title };
    },
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
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
        defaultItem: defaultTranslationService,
      },
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
          ui: {
            itemProps: (item) => {
              return { label: item?.text };
            },
            defaultItem: {
              text: "Bulletpoint text",
            },
          },
          fields: [
            {
              label: "Text",
              name: "text",
              type: "string",
            },
            {
              label: "Explanatory dialog",
              name: "dialog",
              type: "object",
              ui: {
                itemProps: (item) => {
                  return { label: `Dialog: ${item?.link}` };
                },
                defaultItem: {
                  link: "Link to the dialog",
                  title: "The title of the dialog",
                  content: "A definition, and explanation, or whatever you want",
                },
              },
              fields: [
                {
                  label: "Dialog link text",
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
