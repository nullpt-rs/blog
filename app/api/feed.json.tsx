import type { NextRequest } from 'next/server';
import { json1 } from '../server/feed.const';
export const runtime = 'edge';
export const config = {
	runtime: 'nodejs',
};

export default async function handler(req: NextRequest, res: any) {
	res.status(200).json(JSON.parse(json1));
}
