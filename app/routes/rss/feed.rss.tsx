import { rss2 } from "~/posts/rss";

export async function loader() {
  return new Response(rss2, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}