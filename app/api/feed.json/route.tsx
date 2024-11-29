import { json1 } from '../../server/feed.const';
export async function GET() {
	return new Response(json1, {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
