import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { BotIdClient } from 'botid/client';
import 'tailwindcss/tailwind.css';
import './styles/main.css';

export const metadata: Metadata = {
	title: 'nullpt.rs • blog',
	description: 'A collaborative technical blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<BotIdClient protect={[{
					path: '/test',
					method: 'GET',
				}, {
					path: '/api/sensitive',
					method: 'POST',
				}]} />
			</head>
			<body
				className={`py-8 px-4 flex flex-row justify-center color-scheme:dark antialiased ${GeistSans.variable} ${GeistMono.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
