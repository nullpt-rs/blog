import { posts } from './utils/mdxUtils.const';
import Home from './home-page';
export const runtime = 'edge';
export default async function Page() {
	return <Home posts={posts} />;
}

export const revalidate = 0;
