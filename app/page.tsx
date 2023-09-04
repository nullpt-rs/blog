import matter from "gray-matter";
import { readFileSync } from "fs";
import { postFilePaths } from "./utils/mdxUtils";
import Home from "./home-page"

export default async function Page() {
    const fps = await postFilePaths;
	const posts = fps.map((filePath) => {
		const source = readFileSync(filePath);
		const { content, data } = matter(source)
		return {
			content,
			data,
			filePath,
		}
	});

  return <Home posts={posts} />
}