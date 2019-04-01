#!/usr/bin/env node

const program = require("commander");
const open = require("opn");

const { getRepoName, printPretty, getTagName } = require("./util/Prompt");
const { fetchRepositories, fetchRepositoriesByTag } = require("./util/Data");

program.version("1.0");

const parseData = rawData => {
    console.log('raw', rawData)
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

const parseTagData = rawData => {
    console.log('raw', rawData)
    let arr = [];
    rawData.forEach(repo => {
        const {name, created_by } = repo;
        arr.push({
            name,
            created_by,
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
                fetchRepositories(response.repoName) // fetch repo info from github api
                    .then(response => {
                        let data = parseData(response); //parse data
                        printPretty(data)
                        //     .then(response =>
                        //     openRepoLink(response.repoOption)
                        // );
                    })
                    .catch(err => console.log(err));
            });
        }
    });

program
    .command("tags [keyword]")
    .description("Search for repos via tags")
    .action(keyword => {
        if (keyword) {
            //do something with tag
        } else {
            //fetch tags
            getTagName().then(response => {
                fetchRepositoriesByTag(response.tagName).then(response => {
                    console.log(response)
                    let data = parseTagData(response);
                    printPretty(data).then(response =>
                        openRepoLink(response.repoOption))
                })
            })


        }
    });

const openRepoLink = link => {
    console.log(link);
    open(link);
    process.exit();
};

// allow commander to parse `process.argv`
program.parse(process.argv);
