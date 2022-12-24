import {GetServerSideProps} from 'next';
import {feed} from '../server/feed';

const JsonFeedPage: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	if (res) {
		res.end(feed.json1());
	}

	return {props: {}};
};

export default JsonFeedPage;
