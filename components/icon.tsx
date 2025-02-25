"use client";
import * as BoxIcons from "react-icons/bi";
import React from "react";
import { useLayout } from "./layout/layout-context";

export const IconOptions = {
  Tina: (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 319 209" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M8.03195 204.968C12.16 207.656 17.392 209 23.728 209C29.68 209 34.7679 207.752 38.9919 205.256C43.216 202.76 46.672 199.112 49.36 194.312L66.5089 165.224H157.48L162.832 186.248C165.136 194.312 168.256 200.12 172.192 203.672C176.128 207.224 181.936 209 189.616 209C194.992 209 199.6 207.848 203.44 205.544C207.28 203.24 209.872 199.736 211.216 195.032C212.56 190.328 212.176 184.616 210.064 177.896L162.544 22.3761C160.432 15.0801 157.072 9.65611 152.464 6.10411C147.856 2.55212 142 0.776123 134.896 0.776123C127.792 0.776123 121.984 2.12012 117.472 4.80812C112.96 7.49612 108.784 12.0081 104.944 18.3441L4.71995 178.76C1.26395 184.328 -0.0800452 189.416 0.687955 194.024C1.45595 198.632 3.90395 202.28 8.03195 204.968ZM90.1185 124.616L129.136 58.6641H129.712L147.068 124.616H90.1185ZM90.1185 124.616H78.16L84.4959 134.12L90.1185 124.616ZM147.068 124.616L149.872 135.272L158.8 124.616H147.068Z"
            fill="#757575" />
      <path
        d="M190.566 209C183.078 209 177.03 207.176 172.422 203.528C167.814 199.88 164.454 194.312 162.342 186.824L117.414 35.912C115.686 29.384 115.542 23.72 116.982 18.92C118.422 14.12 121.206 10.328 125.334 7.54402C129.462 4.76003 134.406 3.36804 140.166 3.36804C146.694 3.36804 152.166 5.00004 156.582 8.26402C160.998 11.528 164.358 17.576 166.662 26.408L202.086 157.16H186.246L266.022 21.8C269.862 15.272 273.942 10.568 278.262 7.68803C282.582 4.80804 288.102 3.36804 294.822 3.36804C301.926 3.36804 307.446 5.04804 311.382 8.40803C315.318 11.768 317.574 16.04 318.15 21.224C318.726 26.408 317.286 31.784 313.83 37.352L219.654 191.144C215.814 197.48 211.686 202.04 207.27 204.824C202.854 207.608 197.286 209 190.566 209V209Z"
        fill="#757575" />
      <rect x="74" y="119" width="16" height="22" fill="#757575" />
    </svg>
  ),
  ...BoxIcons
};

const iconColorClass: {
  [name: string]: { regular: string; circle: string };
} = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  }
};

const iconSizeClass = {
  xs: "w-6 h-6 flex-shrink-0",
  small: "w-8 h-8 flex-shrink-0",
  medium: "w-12 h-12 flex-shrink-0",
  large: "w-14 h-14 flex-shrink-0",
  xl: "w-16 h-16 flex-shrink-0",
  custom: ""
};

export const Icon = ({
                       data,
                       parentColor = "",
                       className = "",
                       tinaField = ""
                     }) => {
  const { theme } = useLayout();

  if (IconOptions[data.name] === null || IconOptions[data.name] === undefined) {
    return null;
  }

  const { name, color, size = "medium", style = "regular" } = data;

  const IconSVG = IconOptions[name];

  const iconSizeClasses =
    typeof size === "string"
      ? iconSizeClass[size]
      : iconSizeClass[Object.keys(iconSizeClass)[size]];

  const iconColor = color
    ? color === "primary"
      ? theme.color
      : color
    : theme.color;

  if (style == "circle") {
    return (
      <div
        data-tina-field={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    const iconColorClasses =
      iconColorClass[
        parentColor === "primary" &&
        (iconColor === theme.color || iconColor === "primary")
          ? "white"
          : iconColor
        ].regular;
    return (
      <IconSVG
        data-tina-field={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};
