import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  // server: {
  //   host: "192.168.0.101", // Таны локал IP хаяг
  //   port: 5173, // Default порт
  //   open: true, // Хөтчийг автоматаар нээх эсэх
  // },
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
