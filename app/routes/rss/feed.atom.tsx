import { atom1 } from "~/posts/rss.const";

export async function loader() {
  return new Response(atom1, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}