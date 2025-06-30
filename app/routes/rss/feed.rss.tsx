import { rss2 } from "~/posts/rss.const";

export async function loader() {
  return new Response(rss2, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}