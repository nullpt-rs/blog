import { json1 } from "~/posts/rss";

export async function loader() {
  return new Response(json1, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}