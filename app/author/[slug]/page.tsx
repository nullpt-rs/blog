import { getAllPosts } from '../../utils/mdxUtils';
import AuthorPage from './author-page';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const posts = getAllPosts();
	const authorPosts = posts.filter(p => p.data.author === slug);
	return <AuthorPage author={slug} data={authorPosts} />;
}

export async function generateStaticParams() {
	return getAllPosts().map(p => ({
		slug: p.data.author,
	}));
}

export const revalidate = 0;
