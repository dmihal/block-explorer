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
          height: 90px;
          border: solid 2px #d4dee5;
          background-color: #ffffff;
          font-family: Poppins;
          font-size: 25px;
          font-weight: 500;
          color: #69737d;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          border-right: none;
          flex: 1;
          box-sizing: border-box;
          padding: 0 45px;
          outline: none;
        }
        .search {
          background-image: url('${search}');
          background-size: 38px;
          background-position: center;
          height: 90px;
          width: 90px;
          background-color: #04c399;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
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
          width: 38px;
          height: 38px;
          margin: auto;
          border-radius: 50%;
          border: 6px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        .error.not-found {
          position: absolute;
          left: 0;
          right: 0;
          top: 90px;
          background: white;
          font-size: 20px;
          font-weight: 600;
          line-height: 3.5;
          color: #b73853;
          display: flex;
          align-items: center;
        }
        .error.not-found:before {
          content: '';
          background-image: url('${warning}');
          width: 37px;
          height: 37px;
          display: block;
          background-size: contain;
          align-items: center;
          margin-right: 20px;
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
