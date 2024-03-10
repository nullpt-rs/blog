import {globbySync} from 'globby';
import path from 'path';
import {statSync, readFileSync} from 'fs';
import matter from 'gray-matter';

export const POSTS_PATH = path.join(process.cwd(), 'app/posts');

const res = statSync(POSTS_PATH);
if (!res.isDirectory()) {
	throw new Error('POSTS_PATH is not a directory');
}

export const postFilePaths = globbySync('**/app/posts/**/*.mdx');

export const posts = postFilePaths.map(filePath => {
	const source = readFileSync(filePath, 'utf8');
	const {content, data} = matter(source);
	return {
		content,
		data,
		filePath,
		source,
	};
});
