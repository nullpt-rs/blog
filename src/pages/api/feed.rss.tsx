import {NextRequest} from 'next/server';
import {addPosts, feed} from '../../server/feed';

export const config = {
	runtime: 'nodejs',
};

export default async function handler(req: NextRequest, res: any) {
	await addPosts();
	res.setHeader('Content-Type', 'text/xml')
	res.status(200);
    res.write(feed.rss2())
    res.end()
}