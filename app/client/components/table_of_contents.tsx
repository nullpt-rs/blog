"use client";
import React from "react";
import { Heading } from "../../[slug]/page";

export function TableOfContents({
    headings
}: {
    headings: Heading[];
}) {
    return (
        <nav className="max-w-[200px] text-sm">
            <ul className="flex flex-col gap-2">
                {headings.filter(h => h.level < 3).map(heading => (
                    <li key={heading.slug} className="cursor-pointer font-light transition-colors text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white" onClick={() => {
                        const element = document.getElementById(heading.slug);
                        element?.scrollIntoView({ behavior: "smooth" });
                        history.replaceState(null, "", `#${heading.slug}`);
                    }}>
                        <span>
                            {heading.title}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}