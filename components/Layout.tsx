import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Header from './Header';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <Header />
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>

      <style jsx>{`
        main {
          max-width: 1640px;
        }
      `}</style>
      <style jsx global>{`
        html, body {
          min-height: 100%;
        }
        main {
          max-width: 1640px;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </main>
  );
};

export default Layout;
