import React from 'react';
import Link from 'next/link'
import logo from 'assets/logo.svg';

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a className="logo">Home</a>
      </Link>

      <nav>
        <Link href="/blocks">
          <a>Blocks</a>
        </Link>
        <Link href="/roots">
          <a>Roots</a>
        </Link>
        <Link href="/transactions">
          <a>Transactions</a>
        </Link>
        <Link href="/accounts">
          <a>Accounts</a>
        </Link>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;

          font-family: Poppins;
          font-size: 27px;
          font-weight: 500;
          margin: 68px 0 50px;
        }

        .logo {
          background-image: url('${logo}');
          width: 180px;
          height: 52px;
          color: transparent;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        nav a {
          text-decoration: none;
          line-height: 2.56;
          color: #021d17;
          padding: 0 45px;
        }
      `}</style>
    </header>
  );
};

export default Header;
