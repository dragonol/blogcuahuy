import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="prose sm:prose-sm md:prose lg:prose-lg xl:prose-xl mx-auto">
    <Component {...pageProps} />
  </div>
}

export default MyApp
