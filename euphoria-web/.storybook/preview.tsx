import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => {
      document.body.classList.remove("sb-main-padded");
      return (
        <div className="bg-gray-300 min-h-screen p-0 flex items-center justify-center">
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
