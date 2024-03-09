![Banner](/workdocs/assets/Banner.png)
## Typescript Template



![Licence](https://img.shields.io/github/license/TiagoVenceslau/ts-workspace.svg?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/TiagoVenceslau/ts-workspace?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/TiagoVenceslau/ts-workspace?style=plastic)
[![Tests](https://github.com/TiagoVenceslau/ts-workspace/actions/workflows/jest-test.yaml/badge.svg)](http://www.pdmfc.com)
[![CodeQL](https://github.com/starnowski/posmulten/workflows/CodeQL/badge.svg)](https://github.com/TiagoVenceslau/ts-workspace/actions?query=workflow%3ACodeQL)

![Open Issues](https://img.shields.io/github/issues/TiagoVenceslau/ts-workspace.svg)
![Closed Issues](https://img.shields.io/github/issues-closed/TiagoVenceslau/ts-workspace.svg)
![Pull Requests](https://img.shields.io/github/issues-pr-closed/TiagoVenceslau/ts-workspace.svg)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

![Line Coverage](workdocks/badges/badge-lines.svg)
![Function Coverage](workdocks/badges/badge-functions.svg)
![Statement Coverage](workdocks/badges/badge-statements.svg)
![Branch Coverage](workdocks/badges/badge-branches.svg)


![Forks](https://img.shields.io/github/forks/TiagoVenceslau/ts-workspace.svg)
![Stars](https://img.shields.io/github/stars/TiagoVenceslau/ts-workspace.svg)
![Watchers](https://img.shields.io/github/watchers/TiagoVenceslau/ts-workspace.svg)

![Node Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbadges%2Fshields%2Fmaster%2Fpackage.json&label=Node&query=$.engines.node&colorB=blue)
![NPM Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbadges%2Fshields%2Fmaster%2Fpackage.json&label=NPM&query=$.engines.npm&colorB=purple)

Defaults to module, but exports to CommonJS and ESM.

With documentation, update and release mechanisms and gitlab/github workflows to match;

Defines a 'way' to write jsDocs to optimize the output

Optimized for github in terms of badges. CI is equivalent between Gitlab and Github.

Auto setup on first `npm install`

Will accept a `.token` file containing token valid for private npm dependencies, npm and docker registries

## Considerations
 - Setup for a linux based environment (Sorry windows users. use WSL... or just change already);
 - Setup for node 20, but will work at least with 16;
 - Requires docker to build documentation (drawings and PlantUML)

## Documentation

Please find the complete documentation [here](https://tiagovenceslau.github.io/ts-workspace/)

### Related

[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=TiagoVenceslau&repo=ts-workspace)](https://github.com/TiagoVenceslau/ts-workspace)
### Social

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiagovenceslau/)
### Repository Structure

```
ts-workspace
│
│   .gitignore              <-- Defines files ignored to git
│   .nmpignore              <-- Defines files ignored by npm
│   .nmprc                  <-- Defines the Npm registry for this package
│   .gitlab-ci.yml          <-- Gillab CI/CD file
│   gulpfile.js             <-- Gulp build scripts. used for building na other features (eg docs)
│   jest.config.ts          <-- Tests Configuration file
│   mdCompile.json          <-- md Documentation generation configuration file
│   jsdocs.json             <-- jsdoc Documentation generation configuration file
│   LICENCE.md              <-- Licence disclamer
│   package.json
│   package-lock.json
│   README.md               <-- Readme File dynamically compiled from 'workdocs' via the 'docs' npm script
│   tsconfig.json           <-- Typescript config file. Is overriden in 'gulpfile.js' 
│
└───bin
│   │   tag_release.sh      <-- Script to help with releases
│   
└───docs
│   │   ...                 <-- Dinamically generated folder, containing the compiled documentation for this repository. generated via the 'docs' npm script
│   
└───src
│   │   ...                 <-- Source code for this repository
│   
└───tests
│   │───unit                <-- Unit tests
│   └───integration         <-- Integration tests
│   
└───workdocs                <-- Folder with all pre-compiled documentation
│   │───assets              <-- Documentation asset folder
│   │───badges              <-- Auto generated coverage badges folder
│   │───coverage            <-- Auto generated coverage results
│   │───drawings            <-- DrawIO folder. Drawings (*.drawio) here will be processed to generate documentation (requires docker)
│   │───uml                 <-- PlantUML folder. Diagrams (*.puml) here will be processed to generate documentation (requires docker)
│   │───tutorials           <-- Tutorial folder
│   │   ...                 <-- Categorized *.md files that are merged to generate the final readme (via md compile)
│   │   Readme.md           <-- Entry point to the README.md   
│  
└───dist
│   │   ...                 <-- Dinamically generated folder containing the bundles for distribution
│
└───lib
    |   ...                 <-- Dinamically generated folder containing the compiled code
```

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ShellScript](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)

## Getting help

If you have bug reports, questions or suggestions please [create a new issue](https://github.com/tiagovenceslau/ts-workspace/issues/new/choose).

## Contributing

I am grateful for any contributions made to this project. Please read [CONTRIBUTING.MD](./workdocs/98-Contributing.md) to get started.

## License

This project is released under the [MIT License](LICENSE.md).

#### Disclaimer:

badges found [here](https://dev.to/envoy_/150-badges-for-github-pnk), [here](https://github.com/alexandresanlim/Badges4-README.md-Profile#-social-) and [here](https://github.com/Ileriayo/markdown-badges)
