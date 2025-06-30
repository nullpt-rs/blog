interface AuthorInfo {
	contacts: Record<string, string>;
	profilePicture?: string;
}

const authorData: Record<string, AuthorInfo> = {
	veritas: {
		contacts: {
			twitter: 'https://twitter.com/blastbots',
			fedi: 'https://infosec.exchange/@voidstar',
			bluesky: 'https://bsky.app/profile/nullpt.rs',
			discord: 'nullptrs',
		},
		profilePicture: 'https://avatars.githubusercontent.com/u/25884226',
	},
	umasi: {
		contacts: {
			twitter: 'https://twitter.com/umasiii',
			fedi: 'https://infosec.exchange/@umasi',
			discord: 'umasi.',
		},
	},
	jordin: {
		contacts: {
			website: 'https://jord.in/',
			twitter: 'https://twitter.com/jordinjm',
			discord: 'jordin',
		},
		profilePicture: 'https://avatars.githubusercontent.com/u/2218489',
	},
	vmfunc: {
		contacts: {
			twitter: 'https://twitter.com/vmfunc',
			email: 'vmread@pm.me',
			github: 'https://github.com/vmfunc',
		},
		profilePicture: 'https://avatars.githubusercontent.com/u/59031302',
	},
	blackjack: {
		contacts: {
			website: 'https://blackjack.codes/',
		},
		profilePicture: 'https://avatars.githubusercontent.com/u/1939757',
	},
};

export type Authors = keyof typeof authorData;

export function AuthorLinks({ author }: { author: Authors }) {
	const links = authorData[author];
	if (!links) {
		return null;
	}

	return (
		<div className="flex flex-row items-start border-t border-neutral-800 pt-4 gap-4">
			{links.profilePicture && (
				<img
					src={links.profilePicture}
					alt={`${author} profile picture`}
					className="w-24 h-24 rounded-full not-prose"
				/>
			)}
			<div className="w-px bg-neutral-800 self-stretch" />
			<div className="flex flex-col">
				<span className="mb-1">Find {author} on:</span>
				{Object.entries(links.contacts).map(([name, link]) => {
					if (link.startsWith('http')) {
						return (
							<span key={link}>
								{name}:{' '}
								<a key={name} className="underline" href={link}>
									{link}
								</a>
							</span>
						);
					} else {
						return (
							<span key={name}>
								{name}: {link}
							</span>
						);
					}
				})}
			</div>
		</div>
	);
}
