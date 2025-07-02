import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  // future: {
  //   hoverOnlyWhenSupported: true, // 👈 enable hover only when supported
  // },
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'layer-primary': '#fff',
      },
      colors: {
        primary: '#000',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        grotesk: ['var(--font-grotesk)'],
      },
    },
  },
  plugins: [],
};
export default config;
