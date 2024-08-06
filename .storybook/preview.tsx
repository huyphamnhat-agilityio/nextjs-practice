import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import React from "react";
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
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
