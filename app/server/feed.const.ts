import {Feed} from '@nullptrs/feed';
import {postFilePaths} from '../utils/mdxUtils.const';
import {readFileSync} from 'fs';
import matter from 'gray-matter';

const feed = new Feed({
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

postFilePaths
	.map(filePath => {
		const source = readFileSync(filePath, 'utf8');
		const {content, data} = matter(source);
		return {
			content,
			data,
			filePath,
		};
	})
	.filter(post => !post.data.hidden)
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
			});
		}
	});

export const rss2 = feed.rss2();
export const atom1 = feed.atom1();
export const json1 = feed.json1();
