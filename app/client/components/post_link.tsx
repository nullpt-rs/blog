'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export function BlogLink(props: {
	href: string;
	tabIndex: number;
	date: string;
	author: string;
	children: ReactNode;
}) {
	const postedAt = new Date(props.date);

	return (
		<div tabIndex={props.tabIndex}>
			<div className="p-2 md:px-0 rounded-xl transition-colors">
				<div className="flex flex-col">
					<Link href={props.href} className="text-neutral-100 hover:underline">
						{props.children}
					</Link>
					<div className="flex items-baseline">
						<time className="text-neutral-400" dateTime={postedAt.toISOString()}>
							{postedAt.toLocaleDateString('default', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
						<p className="pl-1 text-neutral-400 ">
							by{' '}
							<Link
								className="text-neutral-300 hover:text-white hover:underline"
								passHref
								href={`/author/${props.author}`}
							>
								{props.author}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
