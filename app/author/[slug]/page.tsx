import { posts } from '../../utils/mdxUtils.const';
import AuthorPage from './author-page';

export default async function Page({ params }: { params: { slug: string } }) {
	const p = posts.filter(p => p.data.author === params!.slug);
	return <AuthorPage author={params.slug} data={p} />;
}
