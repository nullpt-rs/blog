import { rss2 } from '../../server/feed.const';
export const runtime = 'edge';
export async function GET() {
	return new Response(rss2, {
		status: 200,
		headers: {
			'Content-Type': 'text/xml',
		},
	});
}
