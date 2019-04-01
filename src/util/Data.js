const axios = require("axios");

function fetchRepositoriesByKeyword(keyword) {
  params = {
    q: keyword
  };
  return axios
      .get("https://api.github.com/search/repositories", {
        params
      } )
      .then(response => response.data.items);
}
function fetchRepositoriesByTag(tag) {
  console.log('tag', tag)
  params = {
    q: tag
  }
  headers = {
    'Accept': 'application/vnd.github.mercy-preview+json',
  }
  return axios.get("https://api.github.com/search/topics",
      { params, headers })
      .then(response => response.data.items).catch(err => console.log(err.response))
}

module.exports = {
  fetchRepositories: fetchRepositoriesByKeyword,
  fetchRepositoriesByTag
};
