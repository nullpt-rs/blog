import { Metadata } from 'next'

import 'tailwindcss/tailwind.css';
import './styles/main.css'
 
export const metadata: Metadata = {
  title: 'nullpt.rs • blog',
  description: 'A technical blog',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800&display=swap" rel="stylesheet" />
        </head>
        <body className='py-24 px-4 flex flex-row justify-center dark:[color-scheme:dark]'>{children}</body>
      </html>
    )
  }