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
    message: 'Please enter the name of your repo. (Required)',
    validate: repoInput => {
        if (repoInput) {
            return true;
        } else {
            console.log('Please provide your repo name before continuing.')
        }
    }
},
{
    type: 'input',
    name: 'description',
    message: 'Please provide a description of your application. (Required)',
    validate: descInput => {
        if (descInput) {
            return true;
        } else {
            console.log('Please provide a description of your application.');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'usage',
    message: 'Please provide directions or guidelines for using your application. (Required)',
    validate: usageInput => {
        if (usageInput) {
            return true;
        } else {
            console.log('Please provide directions or guidelines for using your application.');
            return false;
        }
    }
},
{
    type: 'checkbox',
    name: 'contents',
    message: 'Are there any additional sections you would like to include in your README?',
    choices: [
        {
            name: 'Deployed Application',
            checked: false
        },
        {
            name: 'Installation',
            checked: false
        },
        {
            name: 'Screenshots',
            checked: true
        },
        {
            name: 'Built With',
            checked: true
        },
        {
            name: 'License',
            checked: false
        },
        {
            name: 'Contributing',
            checked: false
        },

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
