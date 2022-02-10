import '@/css/tailwind.css'
import '@/css/prism.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import { Globals } from '@react-spring/shared'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import RSS from '@/components/Rss'
import { AnimationContextProvider } from '@/context/AnimationOrchestrator'
import { ClientReload } from '@/components/ClientReload'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps, router }) {
  // https://github.com/pmndrs/react-spring/issues/1586
  console.warn = function () {}

  Globals.assign({
    frameLoop: 'always',
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <AnimationContextProvider>
        <LayoutWrapper>
          <Component {...pageProps} key={router.route} />
        </LayoutWrapper>
      </AnimationContextProvider>
      <RSS />
    </ThemeProvider>
  )
}
