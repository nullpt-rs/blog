import rehypePrism from '@mapbox/rehype-prism';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import '../styles/codeblocks.css';
import { posts } from '../utils/mdxUtils.const';
import PostPage from './blog-page';

export const dynamicParams = false;
export const runtime = 'nodejs';

export type Heading = {
	slug: string;
	title: string;
	level: number;
};

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
}

function extractHeadings(content: string): Heading[] {
	const headings: Heading[] = [];

	// match the `#` syntax for headings
	const headingMatcher = /^(#+)\s(.+)$/gm;

	let match = headingMatcher.exec(content);
	while (match !== null) {
		const level = match[1].length;
		const title = match[2].trim();
		const slug = slugify(title);

		headings.push({ slug, title, level });
		match = headingMatcher.exec(content);
	}

	return headings;
}

const MDX_COMPONENTS = {
	h1: (props: any) => (
		<h1 id={slugify(props.children)} className="font-system">
			{props.children}
		</h1>
	),
	h2: (props: any) => (
		<h2 id={slugify(props.children)} className="font-system">
			{props.children}
		</h2>
	),
	h3: (props: any) => (
		<h3 id={slugify(props.children)} className="font-system">
			{props.children}
		</h3>
	),
	h4: (props: any) => (
		<h4 id={slugify(props.children)} className="font-system">
			{props.children}
		</h4>
	),
	h5: (props: any) => (
		<h5 id={slugify(props.children)} className="font-system">
			{props.children}
		</h5>
	),
	h6: (props: any) => (
		<h6 id={slugify(props.children)} className="font-system">
			{props.children}
		</h6>
	),
	WebGLFingerprint: dynamic(() => import('../client/components/webgl_fingerprint')),
	OldPost: dynamic(() => import('../client/components/old_post')),
	img: (props: any) => (
		<figure className="flex flex-col items-center">
			<Image {...props} layout="responsive" loading="lazy" width={100} height={100} />
			<figcaption>{props.alt}</figcaption>
		</figure>
	),
};

async function getMDXSource(slug: string) {
	const match = posts.find(p => p.filePath.includes(slug));
	if (!match) {
		throw new Error(`Post with slug "${slug}" not found.`);
	}
	const { source } = match;
	const headings = extractHeadings(source);
	const mdxSource = await compileMDX({
		source,
		// @ts-ignore
		components: MDX_COMPONENTS,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypePrism],
			},
		},
	});

	return { mdxSource, headings };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const { mdxSource, headings } = await getMDXSource(slug);
	return (
		<PostPage content={mdxSource.content} headings={headings} frontMatter={mdxSource.frontmatter} />
	);
}

export async function generateStaticParams() {
	const mdxSources = posts.map(({ source }) => {
		return compileMDX({
			source,
			// @ts-ignore
			components: MDX_COMPONENTS,
			options: {
				parseFrontmatter: true,
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [rehypePrism],
				},
			},
		});
	});
	const resolvedSources = await Promise.all(mdxSources);
	const slugs = resolvedSources.map(s => {
		return { slug: s.frontmatter.slug };
	});
	return slugs;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { mdxSource } = await getMDXSource(slug);
	const { frontmatter } = mdxSource;
	return {
		title: `${frontmatter.name} | nullpt.rs`,
		openGraph: {
			type: 'article',
			title: frontmatter.name as string,
			description: frontmatter.excerpt as string,
			tags: frontmatter.keywords as string[],
			authors: frontmatter.author as string,
			locale: 'en_US',
		},
		description: frontmatter.excerpt as string,
		keywords: frontmatter.keywords as string,
		authors: { name: frontmatter.author as string },
	};
}

// Disable static caching so the content always reflects current MDX on every request during dev.
export const revalidate = 0;
