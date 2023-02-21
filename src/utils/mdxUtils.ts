import fs from 'fs';
import { globby } from 'globby';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'src/posts');

export const postFilePaths = globby("src/posts/**/*.mdx");