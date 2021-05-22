// Importing Config
import Config from '../config/apiConfig';

const cache = {};

export default async function Fetcher(queryStr) {
  try {
    if(typeof cache[queryStr] !== "undefined") {
      return cache[queryStr];
    }
    const responseObj = await fetch(`${Config.searchAPI}?hitsPerPage=${Config.maxResults}&query=${queryStr}`);
    const response = await responseObj.json();
    const results = response.hits.sort((a, b) => {
      const aRelevancyScore = typeof a.relevancy_score === "number" ? a.relevancy_score : 0;
      const bRelevancyScore = typeof b.relevancy_score === "number" ? b.relevancy_score : 0;
      return bRelevancyScore - aRelevancyScore;
    });
    cache[queryStr] = results;
    return cache[queryStr];
  }catch(err) {
    throw err;
  }
};