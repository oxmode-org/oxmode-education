import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages chạy trên subpath /oxmode-education/, còn Vercel chạy ở root /
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  base: isGitHubPages ? '/oxmode-education/' : '/',
  plugins: [react()],
});
