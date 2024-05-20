import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@heroicons/react/24/solid',
      'react',
      'axios',
      'flowbite-react',
    ],
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
