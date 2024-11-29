import { NextRequest } from 'next/server';
import { rss2 } from '../server/feed.const';
export const runtime = 'edge';
export const config = {
	runtime: 'nodejs',
};

export default async function handler(req: NextRequest, res: any) {
	res.setHeader('Content-Type', 'text/xml');
	res.status(200);
	res.write(rss2);
	res.end();
}
