/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // Admin 앱 전용 브레이크포인트 (더 큰 화면 중심

      // Admin 앱 전용 Spacing (더 넓은 간격)
      spacing: {
        // 관리자 UI용 큰 간격
        15: "3.75rem", // 60px
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
        34: "8.5rem", // 136px
        38: "9.5rem", // 152px
        42: "10.5rem", // 168px
        46: "11.5rem", // 184px
        50: "12.5rem", // 200px

        // Admin 앱 특화 간격
        "dashboard-gap": "2rem", // 대시보드 위젯 간격
        "sidebar-width": "16rem", // 사이드바 너비
        "header-height": "4rem", // 헤더 높이
        "content-padding": "2rem", // 콘텐츠 패딩
        "table-row-padding": "1.25rem", // 테이블 행 패딩
      },

      // Admin 앱 전용 최대 너비
      maxWidth: {
        "admin-container": "1600px",
        "admin-sidebar": "280px",
        "admin-content": "1200px",
        "admin-modal": "600px",
        "admin-table": "100%",
      },

      // Admin 앱 전용 그리드 (대시보드용)
      gridTemplateColumns: {
        "admin-dashboard": "repeat(auto-fit, minmax(320px, 1fr))",
        "admin-layout": "280px 1fr",
        "admin-table": "repeat(auto-fit, minmax(150px, 1fr))",
      },

      // Admin 전용 높이
      height: {
        "admin-sidebar": "calc(100vh - 4rem)",
        "admin-content": "calc(100vh - 4rem)",
        "admin-table": "70vh",
      },
    },
  },

  presets: [require("@repo/tailwind-config/tailwind.config.js")],
};
