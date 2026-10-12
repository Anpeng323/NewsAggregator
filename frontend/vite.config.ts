import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 默认代理到 PRD 约定的 8765；若 8765 被占用（如本机其他服务），可用
// API_TARGET=http://localhost:8799 npm run dev 指定后端地址。
const apiTarget = process.env.API_TARGET || 'http://localhost:8765'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      }
    }
  }
})
