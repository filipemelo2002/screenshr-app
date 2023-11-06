import type { Config } from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#ffffff',
        secondary:  '#999999',
        'midnight-black': '#111217',
        'carcoal-gray': '#363a43',
        blue: '#2059EA',
        orange: '#E67E22',
        pink: '#E91E63',
        'slate-blue': '#546E7A'
      }
    },
    fontFamily: {
      'sans': ['Inter', ...fontFamily.sans],
    }
  },
  plugins: [],
}
export default config
