import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages phục vụ ở /oxmode-education/ → đặt base theo env hoặc mặc định khi build CI
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/oxmode-education/' : '/',
  plugins: [react()],
}));
