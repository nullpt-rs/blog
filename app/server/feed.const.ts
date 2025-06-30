import { Feed } from '@nullptrs/feed';
import { posts } from '../utils/mdxUtils.const';

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

posts
	.filter(post => !post.data.hidden)
	.forEach(post => {
		const { data: postData } = post;
		if (!feed.items.find(item => item.id === post.data.slug)) {
			feed.addItem({
				title: postData.name,
				id: postData.slug,
				link: `${process.env.SITE_URL ?? ''}/${postData.slug}`,
				content: postData.excerpt,
				date: new Date(postData.date),
				author: [
					{
						name: postData.author,
					},
				],
			});
		}
	});

export const rss2 = feed.rss2();
export const atom1 = feed.atom1();
export const json1 = feed.json1();
