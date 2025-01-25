const defaultImageSchema = {
  src: "/uploads/image-placeholder.png",
  alt: "",
  adjustment: "contain",
  height: "200",
}

export const imageSchema = {
  label: "Image",
  name: "image",
  type: "object",
  ui: {
    defaultItem: () => {
      return defaultImageSchema;
    },
  },
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
      label: "Adjustment",
      name: "adjustment",
      type: "string",
      options: ["contain", "cover", "scale-down"],
    },
    {
      label: "Size",
      name: "height",
      type: "string",
      options: ["100", "110", "120", "130", "140", "150", "160", "170", "180", "200", "210", "220", "230", "240", "250", "260", "270", "280", "290", "300", "310", "320", "330", "340", "350", "360", "370", "380", "390", "400"],
    },
  ],
};