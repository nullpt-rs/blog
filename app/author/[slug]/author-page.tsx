import Link from 'next/link';
import { BlogLink } from '../../client/components/post_link';
import { AuthorLinks, type Authors } from '../../client/components/author_links';

interface Props {
	author: string;
	data: {
		[key: string]: any;
	};
}

interface Post {
	data: {
		hidden: boolean;
		date: string;
		author: string;
		slug: string;
		name: string;
	};
}

export default function AuthorPage({ author, data }: Props) {
	return (
		<div className="space-y-4 w-full px-0 sm:px-16 max-w-full">
			<div>
				<Link href="/" className="text-neutral-400 hover:text-neutral-600 font-mono">
					../
				</Link>
			</div>

			{/* Author social links and optional profile picture */}
			<AuthorLinks author={author as Authors} />

			<h1>
				Posts by <strong>{author}</strong>
			</h1>

			<ul className="space-y-1 list-disc list-inside">
				{data
					.filter((post: Post) => !post.data.hidden)
					.sort((p: Post, p2: Post) => Date.parse(p2.data.date) - Date.parse(p.data.date))
					.map((post: Post, idx: number) => (
						<BlogLink
							key={post.data.slug}
							date={post.data.date}
							author={post.data.author}
							href={`/${post.data.slug}`}
							tabIndex={idx}
						>
							{post.data.name}
						</BlogLink>
					))}
			</ul>
			
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
