import React from 'react';
import github from 'assets/github.svg';
import medium from 'assets/medium.svg';
import twitter from 'assets/twitter.svg';
import discord from 'assets/discord.svg';
import gitcoin from 'assets/gitcoin.svg';

const Socialbox: React.FC = () => {
  return (
    <div>
      <h2>Follow our progress</h2>

      <div className="sites">
        <a
          href="https://twitter.com/fuellabs_"
          className="social"
          target="social"
          style={{ backgroundImage: `url('${twitter}')` }}
        >
          Twitter
        </a>
        <a
          href="https://github.com/fuellabs"
          className="social"
          target="social"
          style={{ backgroundImage: `url('${github}')` }}
        >
          Github
        </a>
        <a
          href="https://discord.gg/xfpK4Pe"
          className="social"
          target="social"
          style={{ backgroundImage: `url('${discord}')` }}
        >
          Discord
        </a>
        <a
          href="https://medium.com/@fuellabs"
          className="social"
          target="social"
          style={{ backgroundImage: `url('${medium}')` }}
        >
          Medium
        </a>
        <a
          href="https://gitcoin.co/grants/199/fuel-labs"
          className="social"
          target="social"
          style={{ backgroundImage: `url('${gitcoin}')` }}
        >
          Gitcoin
        </a>
      </div>

      <style jsx>{`
        h2 {
          font-size: 46px;
          font-weight: bold;
          text-align: center;
          color: #021d17;
        }

        .sites {
          text-align: center;
        }

        .social {
          display: inline-block;
          width: 66px;
          height: 66px;
          background-color: #04c399;
          overflow: hidden;
          color: transparent;
          border-radius: 100px;
          margin: 16px;
          background-size: 60%;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  )
}

export default Socialbox;
