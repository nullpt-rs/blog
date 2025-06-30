import { readFileSync, statSync } from "node:fs";
import grayMatter from "gray-matter";
import fg from "fast-glob";
import path from "node:path";

export const POSTS_PATH = path.join(process.cwd(), "app/posts");

// Ensure the posts directory exists – helpful during CI or first-run environments.
const stat = statSync(POSTS_PATH);
if (!stat.isDirectory()) {
  throw new Error("POSTS_PATH is not a directory");
}

export const postFilePaths = fg.sync("app/posts/**/*.mdx", {
  cwd: process.cwd(),
});

export const slugsToFiles = Object.fromEntries(
  postFilePaths.map((file) => {
    const reactRouterFilePath = file.split("app/")[1];
    const slug = reactRouterFilePath
      .split("/")
      .at(-1)!
      .replace(/\.mdx$/, "");
    return [slug, file];
  })
);

export type Heading = {
  slug: string;
  title: string;
  level: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(content);
  while (match !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const slug = slugify(title);

    headings.push({ slug, title, level });
    match = headingMatcher.exec(content);
  }

  return headings;
}

export const slugsToMetadata = Object.fromEntries(
  Object.entries(slugsToFiles).map(([slug, file]) => {
    const content = readFileSync(file, "utf8");
    const { data: frontmatter } = grayMatter(content);
    return [slug, { frontmatter, headings: extractHeadings(content) }];
  })
);
