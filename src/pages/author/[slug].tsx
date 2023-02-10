import {GetStaticPaths, GetStaticProps} from 'next';
import Link from 'next/link';
import {BlogLink} from '..';
import {posts} from '../../posts';

interface Props {
	author: string;
}

export default function PostPage({author}: Props) {
	const authorsPosts = posts.filter(post => post.author.toLowerCase() === author.toLowerCase())!;

	return (
		<div className="space-y-4 m-auto max-w-4xl">
			<div>
				<Link href="/" className="text-blue-500 dark:text-neutral-400 hover:text-blue-800 dark:hover:text-neutral-600 font-mono">
					../
				</Link>
			</div>

			<h1>Posts by <strong>{author}</strong></h1>
      <ul className="space-y-1 list-disc list-inside">
					{authorsPosts
					.filter(post => !post.hidden)
					.map(post => (
						<BlogLink key={post.slug} date={post.date} author={post.author} href={`/${post.slug}`}>
							{post.name}
						</BlogLink>
					))}
				</ul>
			<footer className="my-8 text-center">
				<span><span className="text-neutral-500">Content on this site is licensed</span> <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link></span>
			</footer>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
	const author = params!.slug as string;

	const post = posts.filter(post => post.author === author);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			author,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: posts.map(post => ({params: {slug: post.slug}})),
	fallback: 'blocking',
});
