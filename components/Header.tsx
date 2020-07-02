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
        <Link href="/">
          <a>Network</a>
        </Link>
        <a href="/labs">Labs</a>
        <a href="/developers">Developers</a>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;

          font-family: Poppins;
          font-size: 18px;
          font-weight: 500;
          padding: 68px 0 50px;
        }

        .logo {
          background-image: url('${logo}');
          width: 120px;
          height: 34px;
          color: transparent;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }

        nav a {
          text-decoration: none;
          line-height: 2.56;
          color: #021d17;
          padding: 0 15px;
        }
      `}</style>
    </header>
  );
};

export default Header;
