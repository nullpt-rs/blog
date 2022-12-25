import {NextRequest} from 'next/server';
import {feed} from '../../server/feed';

export const config = {
	runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
	return new Response(feed.rss2(), {
		status: 200,
		headers: {
			'content-type': 'text/xml',
		},
	});
}