const inquirer = require("inquirer");

let getRepoName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "RepoName",
      message: "Enter the name of the repository"
    }
  ]);
};

module.exports = {
  getRepoName
};
