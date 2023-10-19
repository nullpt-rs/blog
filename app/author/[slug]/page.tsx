import { readFileSync } from "fs";
import { postFilePaths } from "../../utils/mdxUtils";
import matter from "gray-matter";
import AuthorPage from "./author-page";

export const runtime = 'edge';
  
export default async function Page({ params }: { params: { slug: string } }) {
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

    return <AuthorPage author={params.slug} data={posts} />
}