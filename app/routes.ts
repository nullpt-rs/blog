import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { routes as postsRoutes } from "./posts/routes";

export default [
  index("routes/home.tsx"),
  route("author/:author", "routes/author.$author.tsx"),
  route("feed.rss", "routes/rss/feed.rss.tsx"),
  route("feed.atom", "routes/rss/feed.atom.tsx"),
  route("feed.json", "routes/rss/feed.json.tsx"),
  postsRoutes,
] satisfies RouteConfig;
