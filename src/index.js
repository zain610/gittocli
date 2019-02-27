#!/usr/bin/env node

const program = require("commander");
const open = require("opn");

const { getRepoName, printPretty } = require("./util/Prompt");
const { fetchRepositories } = require("./util/Data");

program.version("1.0");

const parseData = rawData => {
  let arr = [];
  rawData.forEach(repo => {
    const { id, name, html_url, watchers: stars } = repo;
    const owner = repo.owner.login;
    arr.push({
      id,
      name,
      owner,
      html_url,
      stars
    });
  });
  return arr;
  // return data;
};

program
  .command("search [keyword]")
  .description("Search for Repository using name")
  .action(keyword => {
    if (keyword)
      // if user enters a keyword along with a command.
      fetchRepositories(keyword)
        .then(response => {
          // do something
          let data = parseData(response); //parse data
          // console.log(data);
          printPretty(data).then(response => openRepoLink(response.repoOption));
        })
        .catch(err => console.log(err));
    else {
      // if user doesnt, ask for a keyword
      getRepoName().then(response => {
        fetchRepositories(response.RepoName) // fetch repo info from github api
          .then(response => {
            let data = parseData(response); //parse data
            printPretty(data).then(response =>
              openRepoLink(response.repoOption)
            );
          })
          .catch(err => console.log(err));
      });
    }
  });

const openRepoLink = link => {
  console.log(link);
  open(link);
  process.exit();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
