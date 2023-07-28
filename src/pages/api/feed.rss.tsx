import {NextRequest} from 'next/server';
import {feed} from '../../server/feed';

export const config = {
	runtime: 'nodejs',
};

export default function handler(req: NextRequest, res: any) {
	res.setHeader('Content-Type', 'text/xml')
	res.status(200);
    res.write(feed.rss2())
    res.end()
}