// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		mdxRs: true,
		esmExternals: 'loose',
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	env: {
		SITE_URL: 'https://nullpt.rs',
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.const.ts/,
			use: [{loader: 'const-module-loader'}],
		});

		return config;
	},
	async redirects() {
		return [
			{
				source: '/feed.json',
				destination: '/api/feed.json',
				permanent: true,
			},
			{
				source: '/feed.atom',
				destination: '/api/feed.atom',
				permanent: true,
			},
			{
				source: '/feed.rss',
				destination: '/api/feed.rss',
				permanent: true,
			},
			{
				source: '/reverse-engineering-malicious-bots',
				destination: 'https://old.nullpt.rs/reverse-engineering-malicious-bots',
				permanent: false,
			},
			{
				source: '/having-fun-with-javascript-obfuscation',
				destination: 'https://old.nullpt.rs/having-fun-with-javascript-obfuscation',
				permanent: false,
			},
			{
				source: '/dissecting-a-vm',
				destination: 'https://old.nullpt.rs/dissecting-a-vm',
				permanent: false,
			},
			{
				source: '/how-do-i-make-a-bot',
				destination: 'https://old.nullpt.rs/how-do-i-make-a-bot',
				permanent: false,
			},
		];
	},
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(config);
