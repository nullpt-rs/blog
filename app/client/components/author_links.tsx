const authorData = {
	veritas: {
		contacts: {
			twitter: 'https://twitter.com/blastbots',
			fedi: 'https://infosec.exchange/@voidstar',
			discord: 'nullptrs',
		},
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
	},
	blackjack: {
		contacts: {
			website: 'https://blackjack.codes/'
		}
	}
};

type Authors = keyof typeof authorData;

export function AuthorLinks({ author }: { author: Authors }) {
	const links = authorData[author];
	if (!links) {
		return null;
	}

	return (
		<div className="flex flex-col border-t border-neutral-800 pt-4">
			<span>Find {author} on:</span>
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
	);
}
