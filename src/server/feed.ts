import {Feed} from '@nullptrs/feed';

import metadata1 from '../posts/2018/9/anatomy-of-a-supreme-bot-1/metadata.json'
import metadata2 from '../posts/2018/9/anatomy-of-a-supreme-bot-2/metadata.json'
import metadata3 from '../posts/2018/10/anatomy-of-a-supreme-bot-3/metadata.json'
import metadata4 from '../posts/2019/02/tackling-javascript-client-side-security/metadata.json'
import metadata5 from '../posts/2022/12/reverse-engineering-tiktok-vm-obfuscation/metadata.json'
import metadata6 from '../posts/2022/05/new-blog/metadata.json'
import metadata7 from '../posts/2023/01/devirtualizing-nike-bot-protection/metadata.json'
import metadata8 from '../posts/2023/01/devirtualizing-nike-bot-protection-2/metadata.json'

const posts = [metadata1, metadata2, metadata3, metadata4, metadata5, metadata6, metadata7, metadata8];

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
			date: new Date(post.date),
			author: [
				{
					name: post.author,
				},
			],
		})
	);
