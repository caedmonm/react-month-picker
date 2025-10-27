import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(
        __dirname,
        "src/components/MonthPicker/MonthPicker.tsx"
      ),
      name: "SimpleReactMonthPicker",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      // Exclude peer deps from the bundle
      external: ["react", "react-dom", "dayjs"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          dayjs: "dayjs",
        },
      },
    },
    outDir: "dist", // ensure this matches what's in your package.json
  },
});
