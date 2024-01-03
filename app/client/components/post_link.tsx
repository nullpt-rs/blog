"use client";
import Link from "next/link";
import React, {ReactNode} from "react";
export function BlogLink(props: {
	href: string;
	tabIndex: number;
	date: string;
	author: string;
	children: ReactNode;
}) {
	const postedAt = new Date(props.date);
	return (
		<div tabIndex={props.tabIndex} onClick={() => {
            window.location.href = props.href;
		}} className="cursor-pointer">
			<div className="p-2 rounded-xl transition-colors hover:dark:bg-neutral-800 hover:bg-neutral-200">
				<div className="flex flex-col">
					<Link
						href={props.href}
						className="text-blue-600 dark:text-blue-500"
					>
						{props.children}
					</Link>
					<div className="flex items-baseline">
						<time className="dark:text-neutral-400 text-neutral-500" dateTime={postedAt.toISOString()}>
							{postedAt.toLocaleDateString('default', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
						<p className="pl-1 dark:text-neutral-400 text-neutral-500">
							by{' '}
							<Link className="underline hover:text-neutral-800 dark:hover:text-neutral-300" passHref href={`/author/${props.author}`}>
								{props.author}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}