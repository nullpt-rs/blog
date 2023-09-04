import { globby } from 'globby';
import path from 'path';
import { stat } from 'fs/promises';

export const POSTS_PATH = path.join(process.cwd(), 'app/posts');

stat(POSTS_PATH).then((res) => {
    if (!res.isDirectory()) {
        throw new Error('POSTS_PATH is not a directory');
    }
});

export const postFilePaths = globby("**/app/posts/**/*.mdx");