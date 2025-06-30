import { slugsToMetadata } from "~/posts/metadata.const";
import type { Route } from "./+types/author.$author";
import { BlogLink } from "~/components/post_link";
import { AuthorLinks, type Authors } from "~/components/author_links";
import { Link } from "react-router";

export default function AuthorPage({ params}: Route.ComponentProps) {
  return (
    <div className="space-y-4 w-full px-0 sm:px-16 max-w-full">
      <div>
        <Link
          to="/"
          className="text-neutral-400 hover:text-neutral-600 font-mono"
        >
          ../
        </Link>
      </div>

      {/* Author social links and optional profile picture */}
      <AuthorLinks author={params.author as Authors} />

      <h1>
        Posts by <strong>{params.author}</strong>
      </h1>

      <ul className="space-y-1 list-disc list-inside">
        {Object.values(slugsToMetadata)
          .filter((post: any) => !post.frontmatter.hidden && post.frontmatter.author === params.author)
          .sort(
            (p: any, p2: any) =>
              Date.parse(p2.frontmatter.date) - Date.parse(p.frontmatter.date)
          )
          .map((post, idx: number) => (
            <BlogLink
              key={post.frontmatter.slug}
              date={post.frontmatter.date}
              author={post.frontmatter.author}
              href={`/${post.frontmatter.slug}`}
              tabIndex={idx}
            >
              {post.frontmatter.name}
            </BlogLink>
          ))}
      </ul>

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
  );
}
