import 'tailwindcss/tailwind.css';
import '../styles/main.css';
import '../styles/prism-one-dark.css';
import React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
	return (
		<div className="px-4 md:px-16 py-24">
			<Head>
				<title>nullpt.rs • blog</title>
			</Head>

			<Component {...pageProps} />
		</div>
	);
}
