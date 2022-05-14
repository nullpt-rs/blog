import {PageConfig} from 'next';
import Link from 'next/link';
import {ReactNode} from 'react';
import {posts} from '../posts';

// Sweet zero js 🤑
export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function Home() {
	return (
		<>
			<main className="space-y-8">
				<div>
					<a
						className="text-sm text-yellow-700 dark:text-yellow-500"
						href="https://old.nullpt.rs"
					>
						⚠️ Old posts are pending migration to new site. Click here for the old blog.
					</a>
				</div>

				<h2>
					<span>nullpt.rs</span>{' '}
					<a
						target="_blank"
						href="https://github.com/nullpt-rs"
						className="text-neutral-500 hover:text-blue-500"
						rel="noreferrer"
					>
						– github
					</a>
					<a
						target="_blank"
						href="https://twitter.com/nullpt_rs"
						className="text-neutral-500 hover:text-blue-500"
						rel="noreferrer"
					>
						{" "} - twitter
					</a>
				</h2>

				<ul className="space-y-1 list-disc list-inside">
					{posts
					.filter(post => !post.hidden)
					.map(post => (
						<BlogLink key={post.slug} date={post.date} author={post.author} href={`/${post.slug}`}>
							{post.name}
						</BlogLink>
					))}
				</ul>
			</main>
			<footer className="my-8">
				<span><span className="text-neutral-500">Content on this site is licensed</span> <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link></span>
			</footer>
		</>
	);
}

function BlogLink(props: {href: string; date: Date; author: string; children: ReactNode}) {
	return (
		<li className="flex">
			<p className="w-24 text-right pr-2 text-neutral-400">{props.date.toLocaleDateString()}</p>
			<Link passHref href={props.href}>
				<a className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
					{props.children}
				</a>
			</Link>
			<p className="pl-2 text-neutral-400">- {props.author}</p>
		</li>
	);
}
