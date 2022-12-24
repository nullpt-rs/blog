import {Feed} from 'feed';
import {posts} from '../posts';

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

posts
	.filter(post => !post.hidden)
	.forEach(post =>
		feed.addItem({
			title: post.name,
			id: post.slug,
			link: `${process.env.SITE_URL ?? ''}/${post.slug}`,
			content: post.excerpt,
			date: post.date,
			image: post.image,
			author: [
				{
					name: post.author,
				},
			],
		})
	);
