import {readFileSync} from 'fs';
import remarkGfm from 'remark-gfm';
import PostPage from './blog-page';
import rehypeTreeSitter from 'rehype-tree-sitter';
// import rehypeTrestSitter from 'rehype-trest-sitter';
import {compileMDX} from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import '../styles/penumbra.css';
import {postFilePaths} from '../utils/mdxUtils';

export const dynamicParams = false;

const MDX_COMPONENTS = {
	WebGLFingerprint: dynamic(() => import('../client/components/webgl_fingerprint')),
	OldPost: dynamic(() => import('../client/components/old_post')),
	img: (props: any) => (
		<figure className="prose-img flex flex-col items-center">
			<Image {...props} layout="responsive" loading="lazy" width={100} height={100} />
			<figcaption>{props.alt}</figcaption>
		</figure>
	),
};

async function getMDXSource(slug: string) {
	const postFilePath = (await postFilePaths).filter(p => p.includes(slug));
	const source = readFileSync(postFilePath[0]);
	const mdxSource = await compileMDX({
		source,
		// @ts-ignore
		components: MDX_COMPONENTS,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
                    [rehypeTreeSitter, {
                        treeSitterGrammarRoot: "./grammars/",
                        scopeMap: {
                          javascript: "source.js",
                          js: "source.js",
                          cpp: "source.cpp",
                          sh: "source.bash",
                          rust: "source.rust",
                          html: "text.html.basic",
                        },
                      }]
					// [rehypeTrestSitter, {url: 'https://trest.zeb.zone', apiKey: process.env.TREST_API_KEY}],
				],
			},
		},
	});

	return mdxSource;
}

export default async function Page({params}: {params: {slug: string}}) {
	const mdxSource = await getMDXSource(params.slug);
	return <PostPage content={mdxSource.content} frontMatter={mdxSource.frontmatter} />;
}

export async function generateStaticParams() {
	const filePaths = await postFilePaths;
	const mdxSources = filePaths.map(filePath => {
		const source = readFileSync(filePath);

		return compileMDX({
			source,
			// @ts-ignore
			components: MDX_COMPONENTS,
			options: {
				parseFrontmatter: true,
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [],
				},
			},
		});
	});
	const resolvedSources = await Promise.all(mdxSources);
	const slugs = resolvedSources.map(s => {
		return {slug: s.frontmatter.slug};
	});
	return slugs;
}
