// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./src/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			sansserif: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
			mono: ['"DM Mono"', 'monospace'],
		},
		fontWeight: {
			light: 300,
			400: 400,
			medium: 500,
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
