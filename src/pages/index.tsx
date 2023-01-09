import Link from 'next/link';
import {ReactNode} from 'react';
import {posts} from '../posts';

export default function Home() {
	return (
		<>
			<main className="space-y-8">
				<h2>
					<span>nullpt.rs</span>{' '}
					<a
						target="_blank"
						href="https://github.com/nullpt-rs"
						className="text-neutral-500 hover:text-blue-500"
						rel="noreferrer"
					>
						{" "} – github
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
		<div>
			<li className="hidden sm:flex">
				<p className="w-24 text-right text-neutral-400">{props.date.toLocaleDateString()}</p>
				<Link passHref href={props.href} className="pl-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
					{props.children}
				</Link>
				<p className="pl-2 text-neutral-400">- {props.author}</p>
			</li>
			<div className="flex flex-col sm:hidden">
				<Link passHref href={props.href} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
					{props.children}
				</Link>
				<div className="flex">
					<p className="text-neutral-400">{props.date.toLocaleDateString()}</p>
					<p className="pl-1 text-neutral-400">by {props.author}</p>
				</div>
			</div>
		</div>
	);
}
