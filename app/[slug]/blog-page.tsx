import { GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { AuthorLinks } from '../client/components/author_links';
import { postFilePaths } from '../utils/mdxUtils';

interface Props {
	content: any;
	frontMatter: {
		[key: string]: any;
	}
}

export default function PostPage({ content, frontMatter }: Props) {
	return (
		<div className="space-y-4 m-auto max-w-4xl">
			<Head>
				<title>{frontMatter.name}</title>
				<meta name="description" content={frontMatter.excerpt} />
				<meta name="keywords" content={frontMatter.keywords} />
				<meta name="theme-color" content={frontMatter.hidden ? '#ebb305' : '#171717'} />
			</Head>

			{frontMatter.hidden && (
				<div className="bg-yellow-500 text-yellow-900 rounded-md py-2 px-4">
					<p>hey! this post is hidden! please don't share the link for now...</p>
				</div>
			)}

			<div>
				<Link href="/" className="text-blue-500 dark:text-neutral-400 hover:text-blue-800 dark:hover:text-neutral-600 font-mono">
					../
				</Link>
			</div>

			<p>
				<time dateTime={new Date(frontMatter.date).toISOString()}>{new Date(frontMatter.date).toDateString()}</time>
			</p>
			<small>authored by <Link className="underline" passHref href={`/author/${frontMatter.author}`}>{frontMatter.author}</Link></small>
			<main className="prose max-w-none prose-blue prose-img:rounded-md prose-img:w-full dark:prose-invert text-lg">
				<h1>{frontMatter.name}</h1>
				{content}
				<AuthorLinks author={frontMatter.author} />
			</main>
			<footer className="my-8 text-center flex flex-col">
				<span><span className="text-neutral-500">Content on this site is licensed</span> <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link></span>
				<span><Link href="/feed.rss">RSS</Link></span>
			</footer>
		</div>
	);
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const fps = await postFilePaths;
// 	const paths = fps.map((path) => path.replace(/\.mdx?$/, '').substring(path.lastIndexOf('/') + 1)).map((slug) => ({ params: { slug } }));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };