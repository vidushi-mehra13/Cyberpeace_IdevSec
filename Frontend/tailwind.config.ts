import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1f3a',
        slatebg: '#f3f6fb',
        alert: '#c1121f',
      },
      boxShadow: {
        card: '0 8px 30px rgba(11, 31, 58, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
