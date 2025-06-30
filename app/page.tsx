import { getAllPosts } from './utils/mdxUtils.const';
import Home from './home-page';

export default async function Page() {
	const posts = getAllPosts();
	return <Home posts={posts} />;
}

export const revalidate = 0;
