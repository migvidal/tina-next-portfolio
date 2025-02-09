"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import * as React from "react";
import { PageBlocksContact_Form } from "../../tina/__generated__/types";
import { toolbarOverrides } from "./toolbar-overrides";


export const ContactForm = ({ data }: { data: PageBlocksContact_Form }) => {
  const textFieldClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <Section color={data.color}>
      <Container
        size="small"
        width="small"
      >
        {
          data.title && (
            <h2 data-tina-field={tinaField(data, "title")} className="h2">{data.title}</h2>
          )
        }
        {
          data.subtitle && (
            <p data-tina-field={tinaField(data, "subtitle")} className="text-lg font-bold text-center mb-4">{data.subtitle}</p>
          )
        }
        {
          data.body && (
            <p data-tina-field={tinaField(data, "body")} className="text-lg text-center mb-8">
              <TinaMarkdown
                content={data.body}
              />
            </p>
          )
        }
        <form action="https://formspree.io/f/xbldkzkv" method="POST" className="max-w-sm mx-auto">
          {
            data.name_field && (
              <div className="mb-6">
                <label data-tina-field={tinaField(data.name_field, "label")} htmlFor="name" className="form-label">
                  {data.name_field.label}<span className="text-red-500">*</span>
                </label>
                <input
                  required
                  data-tina-field={tinaField(data.name_field, "placeholder")}
                  id="name"
                  name="name"
                  className={textFieldClass}
                  placeholder={data.name_field.placeholder}
                  type="text" />
              </div>
            )
          }
          {data.email_field && (
            <div className="mb-6">
              <label data-tina-field={tinaField(data.email_field, "label")} htmlFor="email" className="form-label">
                {data.email_field.label}<span className="text-red-500">*</span>
              </label>
              <input
                required
                data-tina-field={tinaField(data.email_field, "placeholder")}
                id="email"
                name="email"
                className={textFieldClass}
                placeholder={data.email_field.placeholder}
                type="email" />
            </div>
          )}
          {
            data.body_field && (
              <div className="mb-6">
                <label data-tina-field={tinaField(data.body_field, "label")} htmlFor="message"
                       className="form-label">{data.body_field.label}<span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  data-tina-field={tinaField(data.body_field, "placeholder")}
                  id="message"
                  name="message"
                  className={textFieldClass}
                  placeholder={data.body_field.placeholder}
                  rows={8}></textarea>
              </div>
            )
          }
          {
            data.button && (
              <button data-tina-field={tinaField(data, "button")} type="submit"
                      className="btn btn-primary rounded-full px-6 py-4 bg-black text-white">{data.button}</button>
            )
          }
        </form>
      </Container>
    </Section>
  );
};

const defaultContactForm = {
  title: "Contact",
  subtitle: "This is my contact form",
  body: "This is a longer description",
}

const defaultField = {
  label: "Label",
  placeholder: "Placeholder",
}

export const contactFormSchema = {
  label: "Contact form",
  name: "contact_form",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: defaultContactForm,
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
    },
    {
      label: "Subitle",
      name: "subtitle",
      type: "string",
    },
    {
      label: "Body text",
      name: "body",
      type: "rich-text",
      toolbarOverride: toolbarOverrides,
    },
    {
      label: "Name field",
      name: "name_field",
      type: "object",
      ui: {
        defaultItem: defaultField,
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Email field",
      name: "email_field",
      type: "object",
      ui: {
        defaultItem: defaultField,
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Body field",
      name: "body_field",
      type: "object",
      ui: {
        defaultItem: defaultField,
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string",
        },
      ],
    },
    {
      label: "Submit button",
      name: "button",
      ui: {
        defaultItem: "Send",
      },
      type: "string",
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
