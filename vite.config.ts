import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from 'remark-frontmatter'
import rehypePrism from '@mapbox/rehype-prism';
import constPlugin from "vite-plugin-const";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    mdx({
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [rehypePrism as any],
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    }),
    reactRouter(),
    tsconfigPaths(),
    // @ts-ignore
    constPlugin(),
  ],
});
