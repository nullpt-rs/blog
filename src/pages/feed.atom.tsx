import {GetServerSideProps} from 'next';
import {feed} from '../server/feed';

const AtomFeedPage: React.FC = () => null;

export const getServerSideProps: GetServerSideProps = async ({res}) => {
	if (res) {
		res.end(feed.atom1());
	}

	return {props: {}};
};

export default AtomFeedPage;
