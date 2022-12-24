import {GetServerSideProps} from 'next';
import {feed} from '../server/feed';

const RssFeedPage: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	if (res) {
		res.end(feed.rss2());
	}

	return {props: {}};
};

export default RssFeedPage;
