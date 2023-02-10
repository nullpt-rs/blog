import Link from 'next/link';
import {ReactNode} from 'react';
import {posts} from '../posts';

export default function Home() {
	return (
		<>
			<main className="space-y-8">
				<h2>
					<span>0xparker</span>{' '}
					<a
						target="_blank"
						href="https://github.com/chairwomanpark"
						className="text-neutral-500 hover:text-blue-500"
						rel="noreferrer"
					>
						{" "} – github
					</a>
					<a
						href="new-beginnings"
						className="text-neutral-500 hover:text-blue-500"
						rel="noreferrer"
					>
						{" "} - about
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

export function BlogLink(props: {href: string; date: Date; author: string; children: ReactNode}) {
	return (
		<div>
			<div className="flex flex-col">
				<Link passHref href={props.href} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
					{props.children}
				</Link>
				<div className="flex">
					<p className="text-neutral-400">{props.date.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
					<p className="pl-1 text-neutral-400">by <Link className="underline" passHref href={`/author/${props.author}`}>{props.author}</Link></p>
				</div>
			</div>
		</div>
	);
}
