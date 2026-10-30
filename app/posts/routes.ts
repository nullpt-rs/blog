import { layout, route } from '@react-router/dev/routes';
import fg from "fast-glob";

// Enumerated by the react-router CLI at build time (Node context), before
// the app is bundled.
const postFilePaths = fg.sync("app/posts/**/*.mdx", {
  cwd: process.cwd(),
});

export const routes = layout("routes/post.tsx", postFilePaths.map(post => {
  const reactRouterFilePath = post.split("app/")[1];
  const slug = reactRouterFilePath.split("/").at(-1)!.replace(/\.mdx$/, "");
  return route(slug, reactRouterFilePath);
}));
