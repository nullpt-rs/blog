import { readFileSync } from "fs";
import { globby } from "globby";
import { join } from "path";
import remarkGfm from "remark-gfm";
import PostPage from "./blog-page";
import rehypePrism from 'rehype-prism-plus'
import { compileMDX } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import Image from "next/image";
import "../styles/prism-one-dark.css";
import { postFilePaths } from "../utils/mdxUtils";

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

export default async function Page({ params }: { params: { slug: string } }) {
    // const bruhPlzzz = join(process.cwd(), 'app/posts/**/*.mdx');
    // console.log(bruhPlzzz)
    const postFilePath = (await postFilePaths).filter(p => p.includes(params.slug));
    // const postFilePath = await globby(`**/${params.slug}.mdx`);
    const source = readFileSync(postFilePath[0]);

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
        }
    });

    return <PostPage content={mdxSource.content} frontMatter={mdxSource.frontmatter} />
}