import { MDXProvider } from "@mdx-js/react";
import {
  Link,
  Outlet,
} from "react-router";
import type { Route } from "./+types/post-layout";
import { slugsToMetadata } from "~/posts/metadata.const";
import HackerHeading from "~/components/hacker_heading";
import { TableOfContents } from "~/components/table_of_contents";
import "~/codeblocks.css";
import { AuthorLinks } from "~/components/author_links";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
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
  // WebGLFingerprint: dynamic(() => import('../client/components/webgl_fingerprint')),
  // OldPost: dynamic(() => import('../client/components/old_post')),
  img: (props: any) => (
    <figure className="flex flex-col items-center">
      <img
        {...props}
        layout="responsive"
        loading="lazy"
        width={100}
        height={100}
      />
      <figcaption>{props.alt}</figcaption>
    </figure>
  ),
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const slug = url.pathname
    .split("/")
    .at(-1)!
    .replace(/\.mdx$/, "");
  return slugsToMetadata[slug];
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { frontmatter, headings } = loaderData;
  return (
    <MDXProvider components={MDX_COMPONENTS}>
      <div className="py-20 space-y-4 m-auto max-w-full lg:max-w-3xl transition-all font-sans">
        <aside className="fixed transform -translate-x-60 opacity-0 xl:opacity-100 transition-opacity">
          <nav className="flex flex-col gap-8">
            <a href="/" className="font-mono">
              {"../"}
            </a>
            <TableOfContents headings={headings} />
          </nav>
        </aside>

        <div className="opacity-100 xl:opacity-0 transition-opacity">
          <Link
            to="/"
            className="text-neutral-400 hover:text-neutral-600 font-mono"
          >
            ../
          </Link>
        </div>

        <main className="font-sans prose max-w-none break-words transition-all prose-a:underline prose-a:decoration-neutral-600 hover:prose-a:decoration-neutral-400  prose-a:decoration-1 prose-a:underline-offset-4 prose-code:bg-neutral-800 prose-code:p-1 prose-code:rounded-lg prose-code:content-none prose-img:rounded-md prose-img:w-full prose-invert">
          <HackerHeading text={frontmatter.name} interval={20} />
          <div className="flex flex-col mt-2">
            <time
						className="text-neutral-300 p-0 m-0 "
						dateTime={new Date(frontmatter.date).toISOString()}
					>
						{new Date(frontmatter.date).toDateString()}
					</time>
            <small className="text-neutral-300 p-0 m-0">
              authored by{" "}
              <Link className="underline" to={`/author/${frontmatter.author}`}>
                {frontmatter.author}
              </Link>
            </small>
          </div>
          <Outlet />
          <AuthorLinks author={frontmatter.author} />
        </main>
        <footer className="my-8 text-center flex flex-col">
          <span>
            <span className="text-neutral-500">
              Content on this site is licensed
            </span>{" "}
            <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY-NC-SA 4.0
            </Link>
          </span>
          <span>
            <Link to="/feed.rss">RSS</Link>
          </span>
        </footer>
      </div>
    </MDXProvider>
  );
}
