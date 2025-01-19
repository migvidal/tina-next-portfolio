export const imageSchema = {
  label: "Image",
  name: "image",
  type: "object",
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
};