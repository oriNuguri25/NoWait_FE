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

        white: "var(--white)",
        primary: "var(--primary)",

        black: {
          100: "var(--black-100)",
          90: "var(--black-90)",
          85: "var(--black-85)",
          80: "var(--black-80)",
          70: "var(--black-70)",
          65: "var(--black-65)",
          60: "var(--black-60)",
          55: "var(--black-55)",
          50: "var(--black-50)",
          45: "var(--black-45)",
          40: "var(--black-40)",
          35: "var(--black-35)",
          30: "var(--black-30)",
          25: "var(--black-25)",
          20: "var(--black-20)",
          15: "var(--black-15)",
          10: "var(--black-10)",
        },

        navy: {
          100: "var(--navy-100)",
          90: "var(--navy-90)",
          80: "var(--navy-80)",
          75: "var(--navy-75)",
          70: "var(--navy-70)",
          65: "var(--navy-65)",
          60: "var(--navy-60)",
          55: "var(--navy-55)",
          50: "var(--navy-50)",
          45: "var(--navy-45)",
          40: "var(--navy-40)",
          35: "var(--navy-35)",
          30: "var(--navy-30)",
          25: "var(--navy-25)",
          20: "var(--navy-20)",
          15: "var(--navy-15)",
          10: "var(--navy-10)",
          5: "var(--navy-5)",
        },

        sub: {
          purple: "var(--sub-purple)",
          gray: "var(--sub-gray)",
          brown: "var(--sub-brown)",
          beige: "var(--sub-beige)",
          whitegray: "var(--sub-whitegray)",
        },
      },

      fontFamily: {
        sans: "var(--font-sans)",
        heading: "var(--font-heading)",
        mono: "var(--font-mono)",
        brand: "var(--font-brand)",
      },

      fontSize: {
        // [MO] Headline
        "headline-28-bold": [
          "28px",
          { lineHeight: "130%", letterSpacing: "-0.02em" },
        ],
        "headline-24-bold": [
          "24px",
          { lineHeight: "130%", letterSpacing: "-0.02em" },
        ],
        "headline-22-bold": [
          "22px",
          { lineHeight: "136%", letterSpacing: "-0.01em" },
        ],

        // [MO] Title
        "title-20-bold": [
          "20px",
          { lineHeight: "136%", letterSpacing: "-0.01em" },
        ],
        "title-20-semibold": ["20px", { lineHeight: "136%" }],
        "title-18-bold": ["18px", { lineHeight: "136%" }],
        "title-18-semibold": ["18px", { lineHeight: "136%" }],
        "title-16-bold": ["16px", { lineHeight: "150%" }],

        // [MO] Text
        "text-16-medium": [
          "16px",
          { lineHeight: "144%", letterSpacing: "-0.01em" },
        ],
        "text-15-semibold": ["15px", { lineHeight: "144%" }],
        "text-15-medium": ["15px", { lineHeight: "144%" }],
        "text-15-regular": ["15px", { lineHeight: "144%" }],
        "text-14-medium": ["14px", { lineHeight: "144%" }],
        "text-13-medium": ["13px", { lineHeight: "144%" }],
        "text-12-semibold": ["12px", { lineHeight: "144%" }],
        "text-12-medium": ["12px", { lineHeight: "144%" }],
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
