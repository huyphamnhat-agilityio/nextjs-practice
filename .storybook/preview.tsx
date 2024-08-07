import type { Preview } from "@storybook/react";
import React from "react";
import "@/styles/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";

import { Providers } from "../app/providers";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
