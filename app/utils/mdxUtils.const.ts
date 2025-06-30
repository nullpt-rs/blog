import fg from 'fast-glob';
import path from 'path';
import { statSync, readFileSync } from 'fs';
import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'app/posts');

// Ensure the posts directory exists – helpful during CI or first-run environments.
const stat = statSync(POSTS_PATH);
if (!stat.isDirectory()) {
  throw new Error('POSTS_PATH is not a directory');
}

export const postFilePaths = fg.sync('app/posts/**/*.mdx', { cwd: process.cwd() });

/**
 * Read all MDX files under /app/posts and return their raw source, front-matter
 * and extra metadata. Executed at runtime so edits appear instantly in dev.
 */
export const posts = postFilePaths.map(filePath => {
  const source = readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  return { content, data, filePath, source } as const;
});
