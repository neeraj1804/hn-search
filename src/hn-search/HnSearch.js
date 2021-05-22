import React, {useState, useEffect, useCallback} from 'react';

// Importing components
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';
import useDebounce from '../common/useDebounce';
import Fetcher from '../common/Fetcher';

// Importing config
import config from '../config/apiConfig';

// Importing css
import styles from './HnSearch.module.css';


const HnSearch = () => {
  const [searchStr, setSearchStr] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  const debouncedSearchTerm = useDebounce(searchStr, config.debounceDelay);

  useEffect(() => {
    setIsError(false);
    setSearchData([]);
    if (debouncedSearchTerm) {
      setIsSearching(true);
      Fetcher(debouncedSearchTerm).then(results => {
        setSearchData(results);
      }).catch(err => {
        console.error(err);
        setIsError(true);
      }).finally(() => {
        setIsSearching(false);
      });
    }
  }, [debouncedSearchTerm]);

  const handleSearchStrChange = useCallback((event) => {
    const val = event.target.value;
    setSearchStr(val);
  }, [setSearchStr]);

  let message = "";
  if(searchData && searchData.length === 0 && !isSearching) {
    if(isError) {
      message = "Something went wrong. Please try again later."
    }else if(debouncedSearchTerm.trim().length > 0) {
      message = "No results found!";
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Search Hacker News</h1>
        <SearchBox searchStr={searchStr} handleChange={handleSearchStrChange} />
      </header>
      <main className={styles.main}>
        {isSearching ? <div>Searching ...</div> : <div>{message}</div>}
        <section className={styles.mainContent}>
          {searchData && searchData.length > 0 && <SearchResults searchData={searchData} searchStr={debouncedSearchTerm} />}
        </section>
      </main>
    </div>
  );
};

export default HnSearch;