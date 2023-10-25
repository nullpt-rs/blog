// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./app/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			sansserif: ["system-ui", 
				"-apple-system", "BlinkMacSystemFont", 
				"Segoe UI", 
				"Roboto", 
				"Oxygen", 
				"Ubuntu", 
				"Cantarell", 
				"Fira Sans", 
				"Droid Sans", 
				"Helvetica Neue", 
				"Arial", "sans-serif"],
			mono: ['ui-monospace', 
				'Menlo', 'Monaco', 
				"Cascadia Mono", "Segoe UI Mono", 
				"Roboto Mono", 
				"Oxygen Mono", 
				"Ubuntu Monospace", 
				"Source Code Pro",
				"Fira Mono", 
				"Droid Sans Mono", 
				"Courier New", 'monospace'],
		},
		fontWeight: {
			light: 400,
			medium: 500,
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
