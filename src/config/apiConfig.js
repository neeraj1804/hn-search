const API_ENDPOINT = "http://hn.algolia.com";

const config = {
  maxResults: 10,
  debounceDelay: 250,
  searchAPI: `${API_ENDPOINT}/api/v1/search`
};

export default config;