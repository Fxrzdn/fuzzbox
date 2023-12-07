import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/providers/modal-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'F u z z b o x',
  description: 'A chat app that is just like discord!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider><html lang="en" suppressHydrationWarning>
      <body className={cn(
        font.className,
        "bg-white dark:bg-[#313338]")
        
        }>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="fuzzbox-theme"
        >
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>
               {children}
            </QueryProvider>
          </SocketProvider>
          </ThemeProvider>
        </body>
    </html></ClerkProvider>
  )
}
