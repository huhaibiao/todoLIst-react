/*
 * @Author: huhaibiao
 * @Date: 2024-12-01 22:27:09
 * @description:
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 8088,
    host: true
  }
})
