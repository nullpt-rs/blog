import type {NextRequest} from 'next/server';
import {feed} from '../../server/feed';

export const config = {
	runtime: 'nodejs',
};

export default function handler(req: NextRequest, res: any) {
	res.status(200).json(JSON.parse(feed.json1()));
}