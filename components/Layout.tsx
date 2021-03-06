import React from 'react'
import Head from 'next/head';
import Header from './Header';
import Location from './Location';
import { BreadCrumb } from './BreadCrumbs';

type Props = {
  title?: string;
  breadCrumbs?: BreadCrumb[];
  simple?: boolean;
  noSearch?: boolean;
  active?: string;
}

const Layout: React.FC<Props> = ({
  children,
  breadCrumbs = [],
  title = 'Fuel Labs',
  simple,
  noSearch,
  active,
}) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header noSearch={noSearch} active={active}/>
      {!simple && (
        <Location breadCrumbs={breadCrumbs} />
      )}

      <main>{children}</main>

      <style jsx>{`
        .container {
          max-width: 1080px;
          font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
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
        a:hover {
          color: #03a383;
        }
      `}</style>
    </div>
  );
};

export default Layout;
