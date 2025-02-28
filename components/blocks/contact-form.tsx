"use client";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import * as React from "react";
import {
  PageBlocksContact_Form,
  PageBlocksContact_FormSocials,
  PageBlocksContact_FormSocialsLink
} from "../../tina/__generated__/types";
import Link from "next/link";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FaBluesky, FaFacebook, FaMastodon } from "react-icons/fa6";

const SocialLink = ({ link }: { link: PageBlocksContact_FormSocialsLink }) => {
  if (!link.network || !link.url || !link.username) return null;
  let socialLogo;
  let socialLabel;
  let href = link.url;
  switch (link.network) {
    case "email":
      socialLogo = <FaEnvelope className="size-4" />;
      socialLabel = "Email";
      href = `mailto:${link.url}`;
      break;
    case "linkedin":
      socialLogo = <FaLinkedin className="size-4" />;
      socialLabel = "LinkedIn";
      break;
    case "x":
      socialLogo = <div className="!-my-2">𝕏</div>;
      socialLabel = "X";
      break;
    case "bluesky":
      socialLogo = <FaBluesky className="size-4" />;
      socialLabel = "Bluesky";
      break;
    case "mastodon":
      socialLogo = <FaMastodon className="size-4" />;
      socialLabel = "Mastodon";
      break;
    case "facebook":
      socialLogo = <FaFacebook className="size-4" />;
      socialLabel = "Facebook";
      break;
  }
  if (!socialLogo) return null;
  return (
    <li className="mx-8 my-2 col-span-4 md:col-span-2">
      {
        <Link href={href} className="flex items-center text-lg hover:text-cyan-500">
          <div
            className="main-button">
            {socialLogo}
          </div>
          <p data-tina-field={tinaField(link, "network")}
             className="pl-2 underline underline-offset-8">{`${socialLabel}: ${link.username}`}</p>
        </Link>
      }
    </li>
  );
};

const SocialLinks = ({ data }: { data: PageBlocksContact_FormSocials }) => {
  return (
    <ul className="grid grid-flow-row auto-rows-max my-4 md:grid-cols-4">
      {data.heading && <p className="col-span-4 my-4">{data.heading}</p>}
      {
        data.link && data.link.map((l, index) => (
          <SocialLink key={index} link={l} />
        ))
      }
    </ul>
  );
};


export const ContactForm = ({ data }: { data: PageBlocksContact_Form }) => {
  return (
    <Section color={data.color} id="contact">
      <Container
        size="small"
        width="medium"
      >
        {
          data.title && (
            <h2 data-tina-field={tinaField(data, "title")} className="h2">{data.title}</h2>
          )
        }
        {
          data.subtitle && (
            <p data-tina-field={tinaField(data, "subtitle")}
               className="text-lg font-bold text-center mb-4">{data.subtitle}</p>
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
        <form action="https://formspree.io/f/xbldkzkv" method="POST" className="max-w-lg mx-auto">
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
                  className="form-input"
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
                className="form-input"
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
                  className="form-input"
                  placeholder={data.body_field.placeholder}
                  rows={8}></textarea>
              </div>
            )
          }
          {
            data.button && (
              <button data-tina-field={tinaField(data, "button")} type="submit"
                      className="main-button">{data.button}</button>
            )
          }
        </form>
        {
          data.socials && <div  data-tina-field={tinaField(data, "socials")}>
            <SocialLinks data={data.socials} />
          </div>
        }
      </Container>
    </Section>
  );
};

const defaultContactForm = {
  title: "Contact",
  subtitle: "This is my contact form",
  body: "This is a longer description"
};

const defaultField = {
  label: "Label",
  placeholder: "Placeholder"
};

export const contactFormSchema = {
  label: "Contact form",
  name: "contact_form",
  ui: {
    previewSrc: "/blocks/contact-form.png",
    defaultItem: defaultContactForm
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string"
    },
    {
      label: "Subitle",
      name: "subtitle",
      type: "string"
    },
    {
      label: "Body text",
      name: "body",
      type: "rich-text",
    },
    {
      label: "Name field",
      name: "name_field",
      type: "object",
      ui: {
        defaultItem: defaultField
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string"
        }
      ]
    },
    {
      label: "Email field",
      name: "email_field",
      type: "object",
      ui: {
        defaultItem: defaultField
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string"
        }
      ]
    },
    {
      label: "Body field",
      name: "body_field",
      type: "object",
      ui: {
        defaultItem: defaultField
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Placeholder",
          name: "placeholder",
          type: "string"
        }
      ]
    },
    {
      label: "Submit button",
      name: "button",
      ui: {
        defaultItem: "Send"
      },
      type: "string"
    },
    {
      label: "Social links",
      name: "socials",
      type: "object",
      fields: [
        {
          label: "Heading",
          name: "heading",
          type: "string"
        },
        {
          label: "Social links",
          name: "link",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item.network })
          },
          fields: [
            {
              label: "Social network",
              name: "network",
              type: "string",
              options: [
                { label: "Email", value: "email" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "X", value: "x" },
                { label: "Bluesky", value: "bluesky" },
                { label: "Mastodon", value: "mastodon" },
                { label: "Facebook", value: "facebook" }
              ]
            },
            {
              label: "URL",
              name: "url",
              type: "string"
            },
            {
              label: "Username",
              name: "username",
              type: "string"
            },
          ]
        }
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};
