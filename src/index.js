#!/usr/bin/env node

const program = require("commander");
const open = require("opn");

const { menuOption, getRepoName } = require("./util/Prompt");
const { fetchRepositories } = require("./util/Data");

program.version("1.0");

program
  .command("search [keyword]")
  .description("Search for Repository using name")
  .action(keyword => {
    if (keyword) fetchRepositories(keyword);
    else {
      getRepoName().then(response => console.log(response.repoName));
    }
  });

const openRepoLink = answer => {
  console.log(answer);
  open("http://google.com");
  process.exit();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
