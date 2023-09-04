import { globby } from 'globby';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'app/posts');

export const postFilePaths = globby("app/posts/**/*.mdx");