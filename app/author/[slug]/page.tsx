import { posts } from '../../utils/mdxUtils.const';
import AuthorPage from './author-page';

export const runtime = 'nodejs';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const authorPosts = posts.filter(p => p.data.author === slug);
	return <AuthorPage author={slug} data={authorPosts} />;
}

export async function generateStaticParams() {
	return posts.map(p => ({
		slug: p.data.author,
	}));
}

export const revalidate = 0;
