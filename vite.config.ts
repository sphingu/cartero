import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidStyled from "vite-plugin-solid-styled";

export default defineConfig({
  plugins: [
    solidPlugin(),
    solidStyled({
      prefix: "cartero",
      filter: {
        include: "src/**/*.tsx",
        exclude: "node_modules/**/*.{ts,js,tsx}",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
