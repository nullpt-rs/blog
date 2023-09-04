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
        <body className='px-4 md:px-16 py-24 dark:[color-scheme:dark]'>{children}</body>
      </html>
    )
  }