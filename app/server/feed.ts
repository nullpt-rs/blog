import { Feed } from '@nullptrs/feed';
import { postFilePaths } from '../utils/mdxUtils';
import { readFileSync } from 'fs';
import matter from 'gray-matter';

async function getPosts() {
	const fps = await postFilePaths;
	const posts = fps.map((filePath) => {
		const source = readFileSync(filePath);
		const { content, data } = matter(source)
		return {
			content,
			data,
			filePath,
		}
	});

	return posts;
}

export const feed = new Feed({
	title: 'nullpt.rs • blog',
	id: process.env.SITE_URL ?? '',
	link: process.env.SITE_URL ?? '',
	favicon: `${process.env.SITE_URL ?? ''}/favicon.ico`,
	language: 'en',
	copyright: 'CC BY-NC-SA 4.0',
	feedLinks: {
		atom: `${process.env.SITE_URL ?? ''}/feed.atom`,
		json: `${process.env.SITE_URL ?? ''}/feed.json`,
		rss: `${process.env.SITE_URL ?? ''}/feed.rss`,
	},
});

export async function addPosts() {
	const posts = await getPosts();
	posts.filter(post => !post.data.hidden)
		.forEach(post => {
			if (!feed.items.find(item => item.id === post.data.slug)) {
				feed.addItem({
					title: post.data.name,
					id: post.data.slug,
					link: `${process.env.SITE_URL ?? ''}/${post.data.slug}`,
					content: post.data.excerpt,
					date: new Date(post.data.date),
					author: [
						{
							name: post.data.author,
						},
					],
				})
			}
		}
		);

}

addPosts();