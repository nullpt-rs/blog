import { json1 } from "~/posts/rss.const";

export async function loader() {
  return new Response(json1, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}