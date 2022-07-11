import React from 'react';
import { Link } from 'react-router-dom';
import nav from './nav.module.css';
import SearchBar from './searchBar';

export default function Nav() {
  return (
    <div className={nav.nav}>
      <Link to = "/videogames">
        <span className={nav.button}> Home </span>
      </Link>
      <Link to = "/add">
        <span className={nav.button}> Add new game </span>
      </Link>
      <Link to = "/about">
        <span className={nav.button}> About </span>
      </Link>
      <div className={nav.search}>
        <SearchBar/>
      </div>
    </div>
  );
};
