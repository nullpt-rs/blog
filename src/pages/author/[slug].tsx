import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { readFileSync } from 'fs';
// import { BlogLink } from '..';
import { postFilePaths } from '../../utils/mdxUtils';
import matter from 'gray-matter';
import { BlogLink } from '..';

interface Props {
    author: string;
    data: {
        [key: string]: any;
    }
}

interface Post {
    data: {
        hidden: boolean;
        date: string;
        author: string;
        slug: string;
        name: string;
    }
}

export default function PostPage({ author, data }: Props) {
    return (
        <div className="space-y-4 m-auto max-w-4xl">
            <div>
                <Link href="/" className="text-blue-500 dark:text-neutral-400 hover:text-blue-800 dark:hover:text-neutral-600 font-mono">
                    ../
                </Link>
            </div>

            <h1>Posts by <strong>{author}</strong></h1>
            <ul className="space-y-1 list-disc list-inside">
                {data
                    .filter((post: Post) => !post.data.hidden)
                    .sort((p: Post, p2: Post) => Date.parse(p2.data.date) - Date.parse(p.data.date))
                    .map((post: Post) => (
                        <BlogLink key={post.data.slug} date={post.data.date} author={post.data.author} href={`/${post.data.slug}`}>
                            {post.data.name}
                        </BlogLink>
                    ))}
            </ul>
            <footer className="my-8 text-center flex flex-col">
				<span><span className="text-neutral-500">Content on this site is licensed</span> <Link href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</Link></span>
				<span><Link href="/feed.rss">RSS</Link></span>
			</footer>
        </div>
    );
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const fps = await postFilePaths;
    const posts = fps.map((filePath) => {
        const source = readFileSync(filePath);
        const { content, data } = matter(source)
        return {
            content,
            data,
            filePath,
        }
    }).filter(p => p.data.author === params!.slug)

    if (!posts)
        return { props: { posts } }

    return {
        props: {
            author: params!.slug,
            data: posts
        },
    };
};


export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
});

// export const getStaticPaths: GetStaticPaths = async () => ({
//     paths: posts.map(post => ({ params: { slug: post.slug } })),
//     fallback: 'blocking',
// });
