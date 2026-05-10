import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 정적 호스팅(Netlify drop · subpath · 파일 직접 열기) 호환을 위해 상대 base.
  base: './',
})
