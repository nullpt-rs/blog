// @ts-check

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
	content: ['./app/**/*.{ts,tsx,css}'],
	darkMode: 'media',
	theme: {
		fontFamily: {
			sansserif: ['Inter', '"SF Pro Display"', 'system-ui', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
			mono: ['"SFMono Regular"', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'],
		},
		fontWeight: {
			light: 400,
			medium: 500,
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
