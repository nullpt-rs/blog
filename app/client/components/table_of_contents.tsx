'use client';
import React, { useEffect, useState } from 'react';
import { Heading } from '../../[slug]/page';

export function TableOfContents({ headings }: { headings: Heading[] }) {
	const [activeSlug, setActiveSlug] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				// Find the entry that is currently in view
				const visibleEntry = entries.find(entry => entry.isIntersecting);
				if (visibleEntry) {
					setActiveSlug(visibleEntry.target.id);
				}
			},
			{
				rootMargin: '0px 0px -10% 0px',
				threshold: 0.5,
			}
		);

		headings.forEach(heading => {
			const element = document.getElementById(heading.slug);
			if (element) observer.observe(element);
		});

		return () => {
			observer.disconnect();
		};
	}, [headings]);

	const handleClick = (slug: string) => {
		const element = document.getElementById(slug);
		element?.scrollIntoView({ behavior: 'smooth' });
		history.replaceState(null, '', `#${slug}`);
	};

	// Function to generate padding class based on heading level
	const getPaddingClass = (level: number): string => {
		const paddingMap = {
			1: 'pl-0', // For h1
			2: 'pl-4', // For h2
			3: 'pl-8', // For h3
			4: 'pl-12', // For h4
			5: 'pl-16', // For h5
			6: 'pl-20', // For h6
		};
		return paddingMap[level] || 'pl-0'; // Default to no padding for unexpected levels
	};

	return (
		<nav
			className="max-w-[210px] text-sm overflow-y-auto overflow-x-hidden"
			style={{
				height: 'calc(100vh - 10rem)',
			}}
		>
			<ul className="flex flex-col gap-2">
				{headings.map(heading => (
					<li
						key={heading.slug}
						className={`cursor-pointer font-light transition-colors text-neutral-400 hover:text-white 
                ${getPaddingClass(
									heading.level
								)}  // Apply dynamic left padding based on heading level
                ${activeSlug === heading.slug ? 'text-white font-bold underline' : ''}`}
						onClick={() => handleClick(heading.slug)}
					>
						<span>{heading.title}</span>
					</li>
				))}
			</ul>
		</nav>
	);
}
