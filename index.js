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
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
            {
                name: 'Credits',
                checked: true
            },
        ]
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide a link to your deployed application.',
        when: ({ contents }) => {
            if (contents.indexOf('Deployed Application') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: linkInput => {
            if (linkInput) {
                return true;
            } else {
                console.log('Please provide a link to your deployed application.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please list any required packages for installation of your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Installation') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: installInput => {
            if (installInput) {
                return true;
            } else {
                console.log('Please enter installation instructions for your required packages.');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: licenseInput => {
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information for license(s) used.');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'built with',
        message: 'Please select the technologies that your application was built with.',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js', 'Express.js'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter your contributing guidelines.',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter your contributing guidelines.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter any test information for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('What required packages are needed to run tests for your application?');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide an email address for others to reach you with questions.',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: questionsInput => {
            if (questionsInput) {
                return true;
            } else {
                console.log('Please provide a contact email address.');
                return false;
            }
        }
    }
];
const screenshotQues = [
    {
        type: 'input',
        name: 'screenshotLink',
        message: 'Please provide working a link for your screenshot. (Required)',
        validate: screenshotLinkInput => {
            if (screenshotLinkInput) {
                return true;
            } else {
                console.log('Please provide a working link for your screenshot.')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'screenshotAlt',
        message: 'Please provide secondary text for your screenshot. (Required)',
        validate: screenshotAltInput => {
            if (screenshotAltInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'screenshotDesc',
        message: 'Please provide a description of your screenshot. (Optional)'
    },
    {
        type: 'confirm',
        name: 'confirmAddScreenshot',
        message: 'Would you like to add another screenshot?',
        default: false
    }
];
const creditQues = [
    {
        type: 'input',
        name: 'creditName',
        message: 'Please add the names of any contributers. (Required)',
        validate: creditName => {
            if (creditName) {
                return true;
            } else {
                console.log('Please add the names of any contributers.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditLink',
        message: 'Please provide a link, or links, for any outside credit.  (Required)',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Please provide a link, or links, for any outside credit.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddCredit',
        message: 'Would you like to add another credit?',
        default: false
    }
]

addScreenshots = readmeData => {

    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
    console.log(`
    ==================
    Add New Screenshot
    ==================
        `);
    return inquirer.prompt(screenshotQues)
        .then(screenshotData => {
            readmeData.screenshots.push(screenshotData);
            if (screenshotData.confirmAddScreenshot) {
                return addScreenshots(readmeData);
            } else {
                return readmeData;
            };
        });
};

addCredits = readmeInfo => {

    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
==============
Add New Credit
==============
    `);
    return inquirer.prompt(creditQues)
        .then(creditData => {
            readmeInfo.credits.push(creditData);
            if (creditData.confirmAddCredit) {
                return addCredits(readmeInfo);
            } else {
                return readmeInfo;
            }
        });
};
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('Your README file has been created.')
    });
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions);
 }

// Function call to initialize app
init();
