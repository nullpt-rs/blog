import grayMatter from "gray-matter";

// Vite collects the raw MDX text of every post at build time, so the app
// can read post metadata without touching the filesystem at runtime.
const rawPosts = import.meta.glob<string>("/app/posts/**/*.mdx", {
  query: "?raw",
  import: "default",
  eager: true,
}) satisfies Record<string, string>;

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

function slugFromPath(path: string) {
  return path.split("/").at(-1)!.replace(/\.mdx$/, "");
}

export const slugsToFiles = Object.fromEntries(
  Object.keys(rawPosts).map((file) => [slugFromPath(file), file])
);

export const slugsToMetadata = Object.fromEntries(
  Object.entries(rawPosts).map(([file, content]) => {
    const { data: frontmatter } = grayMatter(content);
    return [
      slugFromPath(file),
      { frontmatter, headings: extractHeadings(content) },
    ];
  })
);
