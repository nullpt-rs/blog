import { atom1 } from "~/posts/rss";

export async function loader() {
  return new Response(atom1, {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  });
}