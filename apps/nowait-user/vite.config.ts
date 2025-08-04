import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
// });

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), svgr()],
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        // /orders 로 시작하는 요청은 모두 백엔드서버 주소로 전달
        "/orders": {
          target: env.VITE_SERVER_URI,
          changeOrigin: true,
        },
        "/v1": {
          target: env.VITE_SERVER_URI,
          changeOrigin: true,
        },
      },
    },
  };
});
