import React from 'react';
import styles from './SearchBoxStyle.module.css';

const SearchBox = ({searchStr, handleChange}) => {
  return (
    <div className={styles.searchBoxCont}>
      <input className={styles.searchBoxInput} type="text" value={searchStr} onChange={handleChange} placeholder="Type here to start searching"/>
    </div>
  );
}

export default SearchBox;