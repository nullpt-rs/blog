import { layout, route } from '@react-router/dev/routes';
import { postFilePaths } from './metadata.const';

export const routes = layout("routes/post.tsx", postFilePaths.map(post => {
  const reactRouterFilePath = post.split("app/")[1];
  const slug = reactRouterFilePath.split("/").at(-1)!.replace(/\.mdx$/, "");
  return route(slug, reactRouterFilePath);
}));
