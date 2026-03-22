/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "rgb(var(--surface-base) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border-default) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        brand: {
          primary: "rgb(var(--brand-primary) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)",
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
          light: "rgb(var(--brand-light) / <alpha-value>)",
        },
        status: {
          success: "rgb(var(--success) / <alpha-value>)",
          warning: "rgb(var(--warning) / <alpha-value>)",
          danger: "rgb(var(--danger) / <alpha-value>)",
          info: "rgb(var(--info) / <alpha-value>)",
        },
      },
      boxShadow: {
        luxe: "0 30px 80px rgba(15, 23, 42, 0.18)",
        card: "0 10px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};
