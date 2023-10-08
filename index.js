// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "Please provide a project title. (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
        } else {
            console.log("Please provide a project title before continuing.");
            return false;
        }
    }
},
{
    type: 'input',
    name: 'github',
    message: 'Please enter your GitHub username. (Required)',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please provide your GitHub username before continuing.');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'repo',
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
