import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

// vite-plugin-prerender's ESM build (dist/index.mjs) uses bare require() at
// module scope, which crashes in ES module scope. Load its CJS build instead.
const nodeRequire = createRequire(import.meta.url);
const vitePrerender = nodeRequire("vite-plugin-prerender");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prerenderPlugin: Plugin = vitePrerender({
  staticDir: path.join(__dirname, "dist"),
  // Only public marketing pages. /login and /admin are noindex and excluded.
  routes: ["/", "/projects", "/reviews", "/privacy", "/terms", "/cookies"],
  renderer: new vitePrerender.PuppeteerRenderer({
    maxConcurrentRoutes: 1,
    skipThirdPartyRequests: true,
    // Wait for the app shell so the capture happens after React mounts...
    renderAfterElementExists: ".app-shell",
    // ...then give react-helmet-async's effects time to flush the
    // per-page head tags before the HTML is captured. Increased from 1500ms
    // because the first route (home) was losing helmet tags.
    renderAfterTime: 3000,
    // Required to launch Chromium inside containers (Vercel build image).
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  }),
});

// Prerendering needs a launchable Chromium. If the required system
// libraries can't be installed, degrade to client-side rendering with a
// warning instead of failing the whole build (Google still executes JS).
const prerenderTolerant: Plugin = {
  ...prerenderPlugin,
  async closeBundle() {
    try {
      const hook = prerenderPlugin.closeBundle as
        | (() => void | Promise<void>)
        | { handler: () => void | Promise<void> }
        | undefined;
      if (typeof hook === "function") {
        await hook();
      } else if (hook && typeof hook.handler === "function") {
        await hook.handler();
      }
    } catch (err) {
      console.warn("[prerender] Skipped: Chromium could not launch in this environment.");
      console.warn(String((err as Error)?.message ?? err).slice(0, 500));
    }
  },
};

export default defineConfig({
  plugins: [
    react(),
    prerenderTolerant,
  ],
  resolve: {
    alias: {
      "@components/atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@components/molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@components/organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@components/templates": path.resolve(__dirname, "./src/components/templates"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@types_cm": path.resolve(__dirname, "./src/types"),
      "@i18n": path.resolve(__dirname, "./src/i18n"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  build: {
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? "asset";
          const info = name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(css)$/.test(name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});