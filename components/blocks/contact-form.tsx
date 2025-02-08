"use client";
import {
  PageBlocksContact_Form,
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { iconSchema } from "../../tina/fields/icon";


export const ContactForm = ({ data }: { data: PageBlocksContact_Form }) => {
  return (
    <Section color={data.color}>
      <Container
        size="large"
      >
        <form action="#" method="POST">
          <div className="mb-6">
            <label htmlFor="name" className="form-label">
              .name.label<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              className="form-input"
              placeholder="{{ .name.placeholder }}"
              type="text" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="form-label">
               .email.label <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              className="form-input"
              placeholder="{{ .email.placeholder }}"
              type="email" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="form-label">.body.label<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="form-input"
              placeholder="{{ .body.placeholder }}"
              rows={8}></textarea>
          </div>
          <div data-netlify-recaptcha="true" className="py-4"></div>
          <button type="submit" className="btn btn-primary rounded-full"> .button</button>
        </form>
      </Container>
    </Section>
  );
};

export const contactFormSchema = {
  label: "Contact form",
  name: "contact_form",
  ui: {
    previewSrc: "/blocks/features.png",
  },
  fields: [
    {
      label: "Name field",
      name: "name_field",
      type: "object",
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
        },
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
      label: "Body",
      name: "body_field",
      type: "object",
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
