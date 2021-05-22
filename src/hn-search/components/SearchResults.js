import React from 'react';

// Importing Components
import { formatDistance, subDays } from 'date-fns';

// Importing styles
import styles from './SearchResults.module.css';

function formatDate(timestamp) {
  return formatDistance(subDays(new Date(timestamp), 0), new Date(), { addSuffix: true });
};

function highlight(text, keyword) {
  if(text && keyword) {
    const wordList = keyword.split(" ");
    wordList.forEach(word => {
      word = word.trim();
      if(word) {
        const regex = new RegExp(`(${word})`, "gi");
        text = text.replaceAll(regex, '<em>$1</em>');
      }
    });
  }
  return text;
};

const SearchResults = React.memo(function SearchResults({searchData, searchStr}) {
  
  return (
    <div className={styles.searchResultsCont}>
      {
        searchData.map(data => {
          return(
            <article className={styles.searchResult} key={data.objectID}>
              <div className={styles.searchResultContent}>
                <div className={styles.title}>
                  <span className={styles.titleContent} dangerouslySetInnerHTML={{__html: highlight(data.title, searchStr)}} />
                  {data.url && <a className={styles.titleUrl} href={data.url} target="_blank" rel="noreferrer">({data.url})</a>}
                </div>
                <div className={styles.meta}>
                  <span>Author: {data.author}</span>
                  <span className={styles.separator}>|</span>
                  <span>{formatDate(data.created_at)}</span>
                  <span className={styles.separator}>|</span>
                  <span>{data.num_comments} comments</span>
                </div>
                {data.story_text && 
                  <div className={styles.description} dangerouslySetInnerHTML={{__html: highlight(data.story_text, searchStr)}} />
                }
              </div>
            </article>
          );
        })
      }
    </div>
  );
});

export default SearchResults;
