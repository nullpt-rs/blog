import type {NextRequest} from 'next/server';
import {addPosts, feed} from '../../server/feed';

export const config = {
	runtime: 'nodejs',
};

export default async function handler(req: NextRequest, res: any) {
	await addPosts();
	res.status(200).json(JSON.parse(feed.json1()));
}