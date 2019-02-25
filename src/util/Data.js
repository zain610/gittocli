const axios = require("axios");

fetchRepositories = keyword => {
  params = {
    q: keyword
  };
  let data = {};
  axios
    .get("https://api.github.com/search/repositories", {
      params: params
    })
    .then(response => {
      return response.data.items;
    })
    .then(repos => {
      let count = 0;
      repos.forEach(repo => {
        console.log(repo);
        const { id, name, owner, html_url } = repo;
        data[id] = {
          id,
          name,
          owner,
          html_url
        };
      });
      console.log(data);
    })
    .catch(e => console.log(e));
};

module.exports = {
  fetchRepositories
};
