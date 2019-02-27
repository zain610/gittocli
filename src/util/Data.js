const axios = require("axios");

function fetchRepositories(keyword) {
  params = {
    q: keyword
  };
  return axios
    .get("https://api.github.com/search/repositories", {
      params: params
    })
    .then(response => response.data.items);
}

module.exports = {
  fetchRepositories
};
