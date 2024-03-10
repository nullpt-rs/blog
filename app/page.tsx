import {posts} from './utils/mdxUtils.const';
import Home from './home-page';

export default async function Page() {
	return <Home posts={posts} />;
}
