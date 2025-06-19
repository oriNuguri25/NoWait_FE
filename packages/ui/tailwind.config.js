/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  // UI 패키지는 공통 설정만 사용
  presets: [require("@repo/tailwind-config/tailwind.config.js")],
};
