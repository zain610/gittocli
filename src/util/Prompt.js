const inquirer = require("inquirer");

let getRepoName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "repoName",
      message: "Enter the name of the repository"
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
        name: `${repo.name} by ${repo.owner} with ${repo.stars} stars`
      })),
      paginated: true
    }
  ]);
};

module.exports = {
  getRepoName,
  printPretty
};
