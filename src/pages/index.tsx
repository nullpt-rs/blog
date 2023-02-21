import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import {ReactNode} from 'react';
// import {posts} from '../posts';
import { postFilePaths } from '../utils/mdxUtils';

export default function Home({ posts }: { posts: any[] }) {
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
					.filter((post: any) => !post.hidden)
					.map(post => (
						<BlogLink key={post.data.slug} filePath={post.data.slug} date={post.data.date} author={post.data.author} href={`/${post.data.href}`}>
							{post.data.name}
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

function BlogLink(props: {href: string; date: string; author: string; filePath: string; children: ReactNode}) {
	console.log("Props: ", props);
	return (
		<li className="flex">
			<p className="w-24 text-right text-neutral-400">{new Date(props.date).toLocaleDateString()}</p>
			<Link passHref as={`/${props.filePath}`} href={`/[slug]`} className="pl-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-600">
				{props.children}
			</Link>
			<p className="pl-2 text-neutral-400">- {props.author}</p>
		</li>
	);
}

export async function getStaticProps() {
	const fps = await postFilePaths;
	const posts = fps.map((filePath) => {
    const source = fs.readFileSync(filePath);
		console.log("Filepath: ", filePath);
		console.log("Source: ", source);
    const { content, data } = matter(source)
		console.log("Content: ", content);
		console.log("Data: ", data);
    return {
      content,
      data,
      filePath,
    }
  })

  return { props: { posts } }
}
