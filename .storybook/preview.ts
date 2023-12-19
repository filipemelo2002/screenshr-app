import type { Preview } from "@storybook/react";
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'midgnight',
      values: [
        {
          name: 'black',
          value: '#000000'
        },
        {
          name: 'midnight',
          value: '#111217'
        },
        {
          name: 'dark',
          value: '#333333'
        },
        {
          name: 'light',
          value: '#F8F8F8'
        },
        {
          name: 'white',
          value: '#ffffff'
        },
      ]
    }
  },
};

export default preview;
