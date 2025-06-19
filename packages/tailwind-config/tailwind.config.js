/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // CSS 변수를 Tailwind에서 참조할 수 있도록 설정
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },

      fontFamily: {
        sans: "var(--font-sans)",
        heading: "var(--font-heading)",
        mono: "var(--font-mono)",
        brand: "var(--font-brand)",
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        hard: "var(--shadow-hard)",
      },

      backgroundImage: {
        "gradient-purple-blue": "var(--gradient-purple-blue)",
        "gradient-emerald-blue": "var(--gradient-emerald-blue)",
        "gradient-sunset": "var(--gradient-sunset)",
      },
    },
  },
  plugins: [],
};
