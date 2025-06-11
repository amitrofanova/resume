/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
