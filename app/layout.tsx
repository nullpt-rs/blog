import { Metadata } from 'next';

import 'tailwindcss/tailwind.css';
import './styles/main.css';

export const metadata: Metadata = {
  title: 'nullpt.rs • blog',
  description: 'A collaborative technical blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='py-24 px-4 flex flex-row justify-center dark:[color-scheme:dark]'>{children}</body>
    </html>
  )
}