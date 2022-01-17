import '@/css/tailwind.css'
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import RSS from '@/components/Rss'
import { AnimationContextProvider } from '@/context/AnimationOrchestrator'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <AnimationContextProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </AnimationContextProvider>
      <RSS />
    </ThemeProvider>
  )
}
