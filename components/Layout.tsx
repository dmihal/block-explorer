import React, { ReactNode } from 'react'
import Head from 'next/head';
import Header from './Header';
import Location from './Location';
import { BreadCrumb } from './BreadCrumbs';
import SFPro from './SFPro';

type Props = {
  children?: ReactNode;
  title?: string;
  breadCrumbs?: BreadCrumb[];
  simple?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  breadCrumbs = [],
  title = 'This is the default title',
  simple,
}) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />
      {!simple && (
        <Location breadCrumbs={breadCrumbs} />
      )}

      <main>{children}</main>
      <footer>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1080px;
          font-family: 'SF Text', sans-serif;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          color: #021d17;
          margin: 0 auto;
          padding: 0px 24px 24px;
          box-sizing: border-box;
        }
        main {
          flex: 1;
        }
      `}</style>
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
        }

        a {
          color: #04c399;
          text-decoration: none;
        }
      `}</style>
      <SFPro />
    </div>
  );
};

export default Layout;
