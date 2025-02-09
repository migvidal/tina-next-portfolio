"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import type { Template } from "tinacms";
import { PageBlocksGallery, PageBlocksGalleryPictures } from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toolbarOverrides } from "./toolbar-overrides";


const PictureCell = ({ picture }: { picture: PageBlocksGalleryPictures }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  useLayoutEffect(() => {
    if (isModalOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  });

  let span: string = "";
  if (picture.size == "large") {
    span = "row-span-2 col-span-2";
  }
  return (
    <>
      <button onClick={() => setModalOpen(true)} className={span}>
        <Image
          data-tina-field={tinaField(picture, "src")}
          className={`rounded-2xl hover:opacity-50`}
          alt={picture.alt ?? ""}
          src={picture.src ?? ""}
          width={550}
          height={825}
        />
      </button>
      <dialog
        ref={dialogRef}
        className="max-w-xl bg-transparent rounded-xl"
        id="dialog"
        onClick={() => setModalOpen(false)}
      >
        <form method="dialog" className="static">
          <Image
            data-tina-field={tinaField(picture, "src")}
            className={`${span}`}
            alt={picture.alt ?? ""}
            src={picture.src ?? ""}
            width={550}
            height={825}
          />
          <button className="w-16 h-16 absolute top-0 right-0 m-4 rounded-full bg-black text-white">
            <FontAwesomeIcon icon={faXmark} className="size-6"></FontAwesomeIcon>
          </button>
        </form>
      </dialog>
    </>
  );
};
export const Gallery = ({ data }: { data: PageBlocksGallery }) => {
  return (
    <Section data-tina-field={tinaField(data, "pictures")} className="text-center px-4">
      {data.title && (
        <h1
          data-tina-field={tinaField(data, "title")}
          className="text-5xl font-bold"
        >
          {data.title}
        </h1>
      )}
      {data.introduction && (
        <div
          data-tina-field={tinaField(data, "introduction")}
          className="text-base opacity-80 leading-relaxed"
        >
          <TinaMarkdown content={data.introduction} />
        </div>
      )}
      <div className="grid grid-rows-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
        {data.pictures && data.pictures.map((picture, index) => <PictureCell key={index} picture={picture} />)}
      </div>
    </Section>
  );
};

export const galleryBlockSchema: Template = {
  name: "gallery",
  label: "Photo gallery",
  ui: {
    previewSrc: "/blocks/content.png",
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
      toolbarOverride: toolbarOverrides,
    },
    {
      label: "Pictures",
      name: "pictures",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.alt };
        },
      },
      fields: [
        {
          label: "Image",
          name: "src",
          type: "image",
        },
        {
          label: "Alt Text",
          name: "alt",
          type: "string",
        },
        {
          label: "Size",
          name: "size",
          type: "string",
          options: ["regular", "large"],
        },
      ],
    },
  ],
};