const { writeFile, copyFile } = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');

const pageHTML = generatePage (name,github);

fs.writeFile('./dist/index.html', pageHTML, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Page created! Check out index.html in this direction to see it!');

    fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Style sheet copied successfully!');
    });
});


const promptUser = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: 'name',
            message: 'What is your name? (Required)',
            valdiate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username (Required)',
            valdiate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your Github Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};


const promptProject = (portfolioData) => {
    console.log(`
==================
Add a New Project
==================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            valdiate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            valdiate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your Project Description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            valdiate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your Github Link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
        .then (projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })
    ])
                // If there's no 'projects' array property, create one
                if (!portfolioData.projects) {
                    portfolioData.projects = [];
                    }
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });
