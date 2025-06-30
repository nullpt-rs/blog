import { atom1 } from '../../server/feed.const';

export async function GET() {
	return new Response(atom1, {
		status: 200,
		headers: {
			'Content-Type': 'text/xml',
		},
	});
}
