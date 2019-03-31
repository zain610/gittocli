const inquirer = require("inquirer");
const chalk = require("chalk");

let getRepoName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "repoName", //key to access data
      message: "Enter the name of the repository"
    }
  ]);
};

let getTagName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "tagName", //key to access data
      message: "Enter a tag"
    }
  ]);
};

const printPretty = data => {
  return inquirer.prompt([
    {
      type: "list",
      name: "repoOption",
      message: "📚 Here are your repos:",
      choices: data.map(repo => ({
        value: `${repo.html_url}`,
        name: `${chalk.redBright(repo.name)} by ${chalk.blueBright.bold(
          repo.owner
        )} with ${chalk.bold.underline(repo.stars)} stars`
      })),
      paginated: true
    }
  ]);
};

module.exports = {
  getRepoName,
  getTagName,
  printPretty
};
