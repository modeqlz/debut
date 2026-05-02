import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        profile: resolve(__dirname, 'profile.html'),
        feed: resolve(__dirname, 'feed.html'),
        forgotPassword: resolve(__dirname, 'forgot-password.html'),
        verifyCode: resolve(__dirname, 'verify-code.html')
      }
    }
  }
});
