const axios = require("axios");

function fetchRepositoriesByKeyword(keyword) {
  params = {
    q: keyword
  };
  return axios
      .get("https://api.github.com/search/repositories", {
        params
      })
      .then(response => response.data.items);
}
function fetchRepositoriesByTag(tag) {
  params = {
    Accept: 'application/vnd.github.mercy-preview+json',
    q: tag
  }
  return axios.get("https://api.github.com/search/topics",
      { params })
      .then(response => console.log(response)).catch(err => console.log('err;',err.response))
}

module.exports = {
  fetchRepositories: fetchRepositoriesByKeyword,
  fetchRepositoriesByTag
};
