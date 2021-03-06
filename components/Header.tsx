import React, { useState } from 'react';
import Link from 'next/link'
import logo from 'assets/bolt.svg';
import github from 'assets/github-dark.svg';
import discord from 'assets/discord-bubble.svg';
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
        <Link href="https://rinkeby.fuel.sh/network">
          <a className={_active('network')}>Network</a>
        </Link>
        <a href="https://docs.fuel.sh">Docs</a>

        <div className="seperator" />

        <a className="social" style={{ backgroundImage: `url('${github}')` }} href="https://github.com/fuellabs">Github</a>
        <a className="social" style={{ backgroundImage: `url('${discord}')` }} href="https://discord.gg/xfpK4Pe">Discord</a>
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
          display: flex;
          align-items: center;
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

        .seperator {
          border-left: solid 1px #a6b3bc;
          height: 60%;
        }

        nav a.social {
          height: 24px;
          width: 24px;
          overflow: hidden;
          color: transparent;
          display: block;
          background-size: contain;
          opacity: 0.65;
          margin: 0 15px;
        }
        nav a.social:hover {
          opacity: 1;
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
