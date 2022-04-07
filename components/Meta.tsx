import Head from 'next/head'
import React from 'react'

Meta.defaultProps = {
    title: 'Next App',
    keywords: 'Nextjs programming',
    description: 'Get the latest news and updates on web development',
}

export default function Meta({ title, keywords, description}) {
  return (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
    </Head>
  )
}
