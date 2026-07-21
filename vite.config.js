import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/my-apod-site/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        daily: resolve(__dirname, "daily.html"),
        search: resolve(__dirname, "search.html"),
        favorite: resolve(__dirname, "favorite.html"),
      },
    },
  },
}));