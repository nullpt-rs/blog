// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	typescript: {
		ignoreBuildErrors: true,
	},
	env: {
		SITE_URL: 'https://nullpt.rs',
	},
	async redirects() {
		return [
      {
        source: '/feed.json',
        destination: 'https://nullpt.rs/api/feed.json',
        permanent: true,
      },
      {
        source: '/feed.atom',
        destination: 'https://nullpt.rs/api/feed.atom',
        permanent: true,
      },
      {
        source: '/feed.rss',
        destination: 'https://nullpt.rs/api/feed.rss',
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
        source: '/the-modernization-of-the-latrine',
        destination: 'https://old.nullpt.rs/the-modernization-of-the-latrine',
        permanent: false,
      },
      {
        source: '/evading-anti-debugging-techniques',
        destination: 'https://old.nullpt.rs/evading-anti-debugging-techniques',
        permanent: false,
      },
      {
        source: '/tackling-javascript-client-side-security-pt-2',
        destination: 'https://old.nullpt.rs/tackling-javascript-client-side-security-pt-2',
        permanent: false,
      },
      {
        source: '/how-do-i-make-a-bot',
        destination: 'https://old.nullpt.rs/how-do-i-make-a-bot',
        permanent: false,
      },
      {
        source: '/tackling-javascript-client-side-security-pt-1',
        destination: 'https://old.nullpt.rs/tackling-javascript-client-side-security-pt-1',
        permanent: false,
      },
      {
        source: '/anatomy-of-a-supreme-bot-pt-2',
        destination: 'https://old.nullpt.rs/anatomy-of-a-supreme-bot-pt-2',
        permanent: false,
      },
      {
        source: '/anatomy-of-a-supreme-bot-pt-1',
        destination: 'https://old.nullpt.rs/anatomy-of-a-supreme-bot-pt-1',
        permanent: false,
      }
		];
	},
};

module.exports = config;
