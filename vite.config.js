import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: './src/mock',      // Mock 文件存放目录
      localEnabled: true,       // 开发环境启用 Mock
      prodEnabled: false,       // 生产环境禁用（按需开启）
      supportTs: true,          // 支持 TypeScript
      watchFiles: true,         // 监视文件改动
      logger: true, 
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      components: path.resolve(__dirname, "./src/components"),
    },
  },
});
