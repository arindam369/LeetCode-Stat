import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return(
   <>
    <Head>
      <meta
        name="description"
        content="Stalk your friends in LeetCode"
      />
      <meta name="author" content="Arindam Halder" />
      <title>LeetCode Stat</title>

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="LeetCode Stat" />
      <meta
        property="og:description"
        content="Stalk your friends in LeetCode"
      />
      <meta property="og:url" content="https://lc-stat.netlify.app" />
      <meta property="og:site_name" content="LeetCode Stat" />
      <meta property="og:image" itemProp="image" content="https://lc-stat.netlify.app/favicon.ico"/>
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <link rel="manifest" href="manifest.json" />
    </Head>
    <Component {...pageProps} />
   </>
  )
}
