import Link from 'next/link';
import { AuthorLinks } from '../client/components/author_links';
import { Heading } from './page';
import { TableOfContents } from '../client/components/table_of_contents';
import HackerHeading from '../client/components/hacker_heading';

interface Props {
	content: any;
	headings: Heading[];
	frontMatter: {
		[key: string]: any;
	};
}

export default function PostPage({ content, frontMatter, headings }: Props) {
	return (
		<div className="py-20 space-y-4 m-auto max-w-full lg:max-w-3xl transition-all font-sans">
			{frontMatter.hidden && (
				<div className="bg-yellow-500 text-yellow-900 rounded-md py-2 px-4">
					<p>hey! this post is hidden! please don't share the link for now...</p>
				</div>
			)}

			<aside className="fixed transform -translate-x-60 opacity-0 xl:opacity-100 transition-opacity">
				<nav className="flex flex-col gap-8">
					<a href="/" className="font-mono">
						{'../'}
					</a>
					<TableOfContents headings={headings} />
				</nav>
			</aside>

			<div className="opacity-100 xl:opacity-0 transition-opacity">
				<Link href="/" className="text-neutral-400 hover:text-neutral-600 font-mono">
					../
				</Link>
			</div>

			<main className="font-sans prose max-w-none break-words transition-all prose-a:underline prose-a:decoration-neutral-600 hover:prose-a:decoration-neutral-400  prose-a:decoration-1 prose-a:underline-offset-4 prose-code:bg-neutral-800 prose-code:p-1 prose-code:rounded-lg prose-code:content-none prose-img:rounded-md prose-img:w-full prose-invert">
				{/* <h1 className="text-md font-mono">{frontMatter.name}</h1> */}
				<HackerHeading text={frontMatter.name} interval={20} />
				<div className="flex flex-col mt-2">
					<time
						className="text-neutral-300 p-0 m-0 "
						dateTime={new Date(frontMatter.date).toISOString()}
					>
						{new Date(frontMatter.date).toDateString()}
					</time>
					<small className="text-neutral-300 p-0 m-0">
						authored by{' '}
						<Link className="underline" passHref href={`/author/${frontMatter.author}`}>
							{frontMatter.author}
						</Link>
					</small>
				</div>
				{content}
				<AuthorLinks author={frontMatter.author} />
			</main>
			<footer className="my-8 text-center flex flex-col">
				<span>
					<span className="text-neutral-500">Content on this site is licensed</span>{' '}
					<Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link>
				</span>
				<span>
					<Link href="/feed.rss">RSS</Link>
				</span>
			</footer>
		</div>
	);
}

// NOTE: The /app router no longer uses getStaticPaths. This export was kept from
// the old Pages router and is no-op in Next 15. It's therefore removed.
