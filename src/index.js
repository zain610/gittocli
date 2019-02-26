#!/usr/bin/env node

const program = require("commander");
const open = require("opn");

const { menuOption, getRepoName } = require("./util/Prompt");
const { fetchRepositories } = require("./util/Data");

program.version("1.0");

const parseData = rawData => {
  const { id, name, html_url, watchers: stars } = rawData;
  console.log(id, name);
  return {
    id,
    name,
    html_url,
    stars
  };
};

program
  .command("search [keyword]")
  .description("Search for Repository using name")
  .action(keyword => {
    if (keyword)
      fetchRepositories(keyword)
        .then(response => {
          // do something
          response.forEach(repo => {
            let data = parseData(repo);
            console.log(data);
          });
        })
        .catch(err => console.log(err));
    else {
      getRepoName().then(response => {
        console.log(response.RepoName);
        fetchRepositories(response.RepoName)
          .then(response => {})
          .catch(err => _);
      });
    }
  });

const openRepoLink = answer => {
  console.log(answer);
  open("http://google.com");
  process.exit();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
