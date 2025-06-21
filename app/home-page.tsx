import Link from 'next/link';
import { BlogLink } from './client/components/post_link';

export default function Home({ posts }: { posts: any[] }) {
	return (
		<div>
						<pre className="text-center font-mono text-[0.45rem] sm:text-[0.6rem] md:text-sm lg:text-base overflow-x-auto text-gradient-animated">
{`
 ███▄    █  █    ██  ██▓     ██▓     ██▓███  ▄▄▄█████▓ ██▀███    ██████ 
 ██ ▀█   █  ██  ▓██▒▓██▒    ▓██▒    ▓██░  ██▒▓  ██▒ ▓▒▓██ ▒ ██▒▒██    ▒ 
▓██  ▀█ ██▒▓██  ▒██░▒██░    ▒██░    ▓██░ ██▓▒▒ ▓██░ ▒░▓██ ░▄█ ▒░ ▓██▄   
▓██▒  ▐▌██▒▓▓█  ░██░▒██░    ▒██░    ▒██▄█▓▒ ▒░ ▓██▓ ░ ▒██▀▀█▄    ▒   ██▒
▒██░   ▓██░▒▒█████▓ ░██████▒░██████▒▒██▒ ░  ░  ▒██▒ ░ ░██▓ ▒██▒▒██████▒▒
░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ░ ▒░▓  ░░ ▒░▓  ░▒▓▒░ ░  ░  ▒ ░░   ░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░
░ ░░   ░ ▒░░░▒░ ░ ░ ░ ░ ▒  ░░ ░ ▒  ░░▒ ░         ░      ░▒ ░ ▒░░ ░▒  ░ ░
   ░   ░ ░  ░░░ ░ ░   ░ ░     ░ ░   ░░         ░        ░░   ░ ░  ░  ░  
         ░    ░         ░  ░    ░  ░                     ░           ░  
                                                                        
`}
			</pre>
		
		<div className="flex flex-col w-full mt-10 md:w-[900px] md:border-[1px] md:border-transparent border-solid p-4 transition-all border-gradient-animated">
			<main className="space-y-8">
				<div className="flex gap-2">
					<span>nullpt.rs</span>
					<a
						target="_blank"
						href="https://github.com/nullpt-rs"
						className="text-neutral-500 hover:text-white hover:underline"
						rel="noreferrer"
					>
						github
					</a>
					<a
						target="_blank"
						href="https://twitter.com/nullpt_rs"
						className="text-neutral-500 hover:text-white hover:underline"
						rel="noreferrer"
					>
						twitter
					</a>
					<a
						target="_blank"
						href="https://discord.gg/nullptr"
						className="text-neutral-500 hover:text-white hover:underline"
						rel="noreferrer"
					>
						discord
					</a>
					<a
						target="_blank"
						href="https://nullpt.rs/feed.rss"
						className="text-neutral-500 hover:text-white hover:underline"
						rel="noreferrer"
					>
						rss
					</a>
				</div>

				<ul className="space-y-1 list-disc list-inside">
					{posts
						.filter((post: any) => !post.data?.hidden)
						.sort((p, p2) => Date.parse(p2.data.date) - Date.parse(p.data.date))
						.map((post, postIndex) => (
							<BlogLink
								tabIndex={postIndex}
								key={post.data.slug}
								date={post.data.date}
								author={post.data.author}
								href={`/${post.data.slug}`}
							>
								{post.data.name}
							</BlogLink>
						))}
				</ul>
			</main>
			<footer className="mt-4">
				<span>
					<span className="text-neutral-500">Content on this site is licensed</span>{' '}
					<Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link>
				</span>
			</footer>
		</div>
		</div>
	);
}
