/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // CSS 변수를 Tailwind에서 참조할 수 있도록 설정
      colors: {
        // Primary Color
        primary: "var(--primary)",

        // Black Scale (100-5)
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
          5: "var(--black-5)",
        },

        // Navy Scale (100-5)
        navy: {
          100: "var(--navy-100)",
          90: "var(--navy-90)",
          85: "var(--navy-85)",
          80: "var(--navy-80)",
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

        // White
        white: {
          100: "var(--white-100)",
          DEFAULT: "var(--white-100)",
        },

        // 상태 색상
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",

        // Sub Color
        purple: "var(--purple)",
        "light-purple": "var(--light-purple)",
        "cool-black": "var(--cool-black)",
        brown: "var(--brown)",
        orange: "var(--orange)",
        red: "var(--red)",
        gray: "var(--gray)",
      },

      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "Helvetica Neue",
          "Segoe UI",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "Malgun Gothic",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "sans-serif",
        ],
        heading: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        brand: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },

      fontSize: {
        // [MO] Headline - Pretendard Bold
        "headline-28-bold": [
          "28px",
          { lineHeight: "130%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-24-bold": [
          "24px",
          { lineHeight: "130%", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "headline-22-bold": [
          "22px",
          { lineHeight: "136%", letterSpacing: "-0.01em", fontWeight: "700" },
        ],

        // [MO] Title - Pretendard Bold/SemiBold
        "title-20-bold": [
          "20px",
          { lineHeight: "136%", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "title-20-semibold": [
          "20px",
          { lineHeight: "136%", letterSpacing: "0%", fontWeight: "600" },
        ],
        "title-18-bold": [
          "18px",
          { lineHeight: "136%", letterSpacing: "0%", fontWeight: "700" },
        ],
        "title-18-semibold": [
          "18px",
          { lineHeight: "136%", letterSpacing: "0%", fontWeight: "600" },
        ],
        "title-16-bold": [
          "16px",
          { lineHeight: "150%", letterSpacing: "0%", fontWeight: "700" },
        ],

        // [MO] Text - Pretendard Medium/SemiBold/Regular
        "text-16-medium": [
          "16px",
          { lineHeight: "144%", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "text-16-regular": [
          "16px",
          { lineHeight: "144%", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "text-15-semibold": [
          "15px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "600" },
        ],
        "text-15-medium": [
          "15px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "500" },
        ],
        "text-15-regular": [
          "15px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "400" },
        ],
        "text-14-medium": [
          "14px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "500" },
        ],
        "text-13-regular": [
          "13px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "400" },
        ],
        "text-12-semibold": [
          "12px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "600" },
        ],
        "text-12-medium": [
          "12px",
          { lineHeight: "144%", letterSpacing: "0%", fontWeight: "500" },
        ],

        // 기본 Tailwind 사이즈도 유지 (호환성을 위해)
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        hard: "var(--shadow-hard)",
      },

      spacing: {
        // 기존 spacing 유지하면서 아이콘 사이즈 추가
        "icon-xs": "var(--icon-xs)",
        "icon-s": "var(--icon-s)",
        "icon-m": "var(--icon-m)",
        "icon-l": "var(--icon-l)",
        "icon-xl": "var(--icon-xl)",

        // Layout spacing
        "layout-pc-margin": "var(--layout-pc-margin)",
        "layout-pc-gutter": "var(--layout-pc-gutter)",
        "layout-tablet-margin": "var(--layout-tablet-margin)",
        "layout-tablet-gutter": "var(--layout-tablet-gutter)",
        "layout-small-tablet-margin": "var(--layout-small-tablet-margin)",
        "layout-small-tablet-gutter": "var(--layout-small-tablet-gutter)",
        "layout-mobile-large-margin": "var(--layout-mobile-large-margin)",
        "layout-mobile-large-gutter": "var(--layout-mobile-large-gutter)",
        "layout-mobile-margin": "var(--layout-mobile-margin)",
        "layout-mobile-gutter": "var(--layout-mobile-gutter)",
      },

      width: {
        // 아이콘 width 사이즈
        "icon-xs": "var(--icon-xs)",
        "icon-s": "var(--icon-s)",
        "icon-m": "var(--icon-m)",
        "icon-l": "var(--icon-l)",
        "icon-xl": "var(--icon-xl)",
      },

      height: {
        // 아이콘 height 사이즈
        "icon-xs": "var(--icon-xs)",
        "icon-s": "var(--icon-s)",
        "icon-m": "var(--icon-m)",
        "icon-l": "var(--icon-l)",
        "icon-xl": "var(--icon-xl)",
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
