import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-redux": ["@reduxjs/toolkit", "react-redux"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-slot",
            "lucide-react",
            "framer-motion",
            "clsx",
            "tailwind-merge",
          ],
          "vendor-charts": ["recharts"],
          "vendor-editor": ["react-quill", "dompurify"],
          "vendor-pdf": ["jspdf", "html2canvas", "@hello-pangea/dnd"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

