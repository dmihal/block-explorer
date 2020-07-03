import React, { useState } from 'react';
import Link from 'next/link'
import logo from 'assets/logo.svg';

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={isOpen ? 'open' : ''}>
      <Link href="/">
        <a className="logo">Home</a>
      </Link>

      <div onClick={() => setOpen(!isOpen)} className="menu-btn"><div /></div>

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
        @media (max-width: 600px) {
          header {
            flex-wrap: wrap;
          }

          .menu-btn {
            width: 22px;
          }

          .menu-btn:after, 
          .menu-btn:before, 
          .menu-btn div {
            background-color: #021d17;
            content: '';
            display: block;
            height: 2px;
            margin: 4px 0;
            transition: all .2s ease-in-out;
          }

          .open .menu-btn:before {
            transform: translateY(6px) rotate(135deg);
          }
          .open .menu-btn:after {
            transform: translateY(-6px) rotate(-135deg);
          }
          .open .menu-btn div {
            transform: scale(0);
          }

          nav {
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height: 0;
            transition: height 1s;
            padding-top: 20px;
            box-sizing: border-box;
          }

          .open nav {
            height: 160px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
