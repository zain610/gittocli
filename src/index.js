#!/usr/bin/env node

const program = require("commander");
const open = require("opn");

const { menuOption, getRepoName } = require("./util/Prompt");
const { fetchRepositories } = require("./util/Data");

program.version("1.0");

const parseData = rawData => {
  let data = {};
  rawData.forEach(repo => {
    const { id, name, html_url, watchers: stars } = repo;
    console.log(id, name);
    data[id] = {
      id,
      name,
      html_url,
      stars
    };
  });
  return data;
};

program
  .command("search [keyword]")
  .description("Search for Repository using name")
  .action(keyword => {
    if (keyword)
      fetchRepositories(keyword)
        .then(response => {
          // do something
          let data = parseData(repo);
          console.log(data);
        })
        .catch(err => console.log(err));
    else {
      getRepoName().then(response => {
        console.log(response.RepoName);
        fetchRepositories(response.RepoName)
          .then(response => {
            let data = parseData(response);
            console.log(data);
          })
          .catch(err => console.log(err));
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
