import React, { useState } from 'react';
import Link from 'next/link'
import logo from 'assets/bolt.svg';
import SearchBar from './SearchBar';

interface HeaderProps {
  noSearch?: boolean;
  active?: string;
}

const Header: React.FC<HeaderProps> = ({ noSearch, active }) => {
  const [isOpen, setOpen] = useState(false);
  const _active = (page: string) => page === active ? 'active' : '';


  return (
    <header className={isOpen ? 'open' : ''}>
      <Link href="/">
        <a className="logo">Fuel</a>
      </Link>

      {!noSearch && (
        <div className="search-container">
          <SearchBar skinny />
        </div>
      )}

      <div onClick={() => setOpen(!isOpen)} className="menu-btn"><div /></div>

      <nav>
        <Link href="/network">
          <a className={_active('network')}>Network</a>
        </Link>
        <Link href="/labs">
          <a className={_active('labs')}>Labs</a>
        </Link>
        <a href="/developers">Developers</a>
      </nav>

      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 500;
          padding: 68px 0 50px;
        }

        .logo {
          background-image: url('${logo}');
          height: 54px;
          background-size: contain;
          background-position: 0 center;
          background-repeat: no-repeat;
          font-size: 40px;
          font-weight: 600;
          font-stretch: normal;
          font-style: italic;
          line-height: 1.4;
          color: #04c399;
          padding-left: 60px;
          margin-right: 45px;
        }

        .search-container {
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          max-width: 450px;
        }

        nav {
          margin-left: 8px;
        }
        nav a {
          text-decoration: none;
          line-height: 2.56;
          color: #69737d;
          margin: 0 15px;
        }
        nav a.active {
          color: #021d17;
          border-bottom: solid 2px black;
        }
        nav a:hover {
          color: #021d17;
        }

        @media (max-width: 800px) {
          .search-container {
            display: none;
          }
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
