import type {NextRequest} from 'next/server';
import {feed} from '../../server/feed';

export const config = {
	runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
	return new Response(feed.json1(), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
}

const JsonFeedPage: React.FC = () => null;

// export const getServerSideProps: GetServerSideProps = async ({res}) => {
// 	if (res) {
// 		res.end(feed.json1());
// 	}

// 	return {props: {}};
// };

// export default JsonFeedPage;
