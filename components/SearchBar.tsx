import React, { useState } from 'react';
import { useRouter } from 'next/router';
import search from 'assets/search.svg';
import warning from 'assets/warning.png';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [val, setVal] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    if (val.length === 0) {
      return;
    }

    setStatus('loading');

    const response = await fetch(`/api/search/${val}`);
    const json = await response.json();

    if (json.page) {
      router.push(json.page, json.path);
    } else {
      setStatus('not-found');
    }
  };

  return (
    <form className="container" onSubmit={submit}>
      <input
        value={val}
        onChange={(e: any) => setVal(e.target.value)}
        placeholder="Search a block, transaction or account…"
        className="input"
      />
      <button className={`search ${status}`} type="submit" />
      {status === 'not-found' && (
        <div className="error not-found">Your search did not return any results.</div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          position: relative;
        }
        .input {
          height: 55px;
          border: solid 2px #d4dee5;
          background-color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          color: #021d17;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: none;
          flex: 1;
          box-sizing: border-box;
          padding: 0 30px;
          margin: 0;
          outline: none;
        }
        .input:placeholder {
          color: #69737d;
        }
        .search {
          background-image: url('${search}');
          background-size: 20px;
          background-position: center;
          height: 55px;
          width: 55px;
          background-color: #04c399;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          background-repeat: no-repeat;
          border: none;
          outline: none;
          padding: 0;
        }
        .search:active {
          background-color: #04b48e;
        }
        .search.loading {
          background-image: none;
        }
        .search.loading:after {
          content: '';
          display: block;
          width: 20px;
          height: 20px;
          margin: auto;
          border-radius: 50%;
          border: 3px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        .error.not-found {
          position: absolute;
          left: 0;
          right: 0;
          top: 55px;
          background: white;
          font-weight: 500;
          line-height: 3.5;
          color: #b73853;
          display: flex;
          align-items: center;
        }
        .error.not-found:before {
          content: '';
          background-image: url('${warning}');
          width: 20px;
          height: 20px;
          display: block;
          background-size: contain;
          align-items: center;
          margin-right: 20px;
        }

        @media (max-width: 600px) {
          .input {
            font-size: 12px;
            height: 34px;
            border: solid 0.5px #d4dee5;
            padding: 0 12px;
          }
          .search {
            height: 34px;
            width: 34px;
            background-size: 15px;
          }

          .error.not-found {
            top: 34px;
            font-size: 11px;
          }

          .error.not-found:before {
            height: 18px;
            width: 18px;
          }

        }

        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  )
}

export default SearchBar;
