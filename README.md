game-of-life
============

##Authored Date

April 2014

(last edit: April 2014)

##Overview

AngularJS application : evolves generations of dead or alive cells in a game board

##Dependencies

[Setup instructions default to Mac OS X environment, but setup should be possible in Windows and Linux, too]

Install Node dependencies (Node, NPM, NVM) [Node compatible version >= 0.10.0 < 0.11.0]

```
~ http://nodejs.org
~ https://www.npmjs.org/
~ https://github.com/creationix/nvm
```

Install Grunt dependencies [npm install -g grunt-cli]

```
~ http://gruntjs.com/getting-started
```

Install Bower dependencies [npm install -g bower, Git via http://git-scm.com]

```
~ http://bower.io
~ http://git-scm.com
```

Install Compass / Sass dependencies (Ruby, Compass) [gem update --system && gem install compass]

```
~ https://github.com/gruntjs/grunt-contrib-compass

** Note: See the http://stackoverflow.com/questions/21079342/cant-use-compass-after-installing-it selected answer for a description of potential Compass / Sass compatibility issues.

** Recommended Compass and Sass gem versions:
~~ compass-0.12.5
~~ sass-3.2.19
```

##Setup

Clone repo to local.

Then, from terminal cd (change directory) to the local repo directory to proceed with the project build below:

Use correct nvm version >= 0.10.0 < 0.11.0 (version 0.10.26 recommended) e.g.:

```
nvm use 0.10.26
```

Run "npm install" to install project dependencies from package.json:

```
npm install
```

Run "bower update" to resolve Bower dependencies

```
npm install
```

If issues installing node packages, try the solution below. Otherwise, continue to the Prepare step.

```
rm -rf node_modules
sudo npm cache clean
sudo npm install
sudo bower install
```

##Run Prepare

Run "grunt prepare" to install project dependencies from bower.json.

```
grunt prepare
```

##Run Dev-Mode

Run "grunt serve" command from root to run application locally

```
grunt serve
```

##Run Production-Mode

Run "grunt build" command from root to compile js, css, & html into disbrution-ready, minified code

```
grunt build
```

Use http-server for node.js to run the distribution files in production-mode locally

Install the http-server package globally:

```
npm install http-server -g
```

Open "dist" folder from root of project. Run the http-server e.g.

```
http-server -p 8000
```

Open the localhost port (e.g. localhost:8000) in your browser

##Run Tests

Run "grunt test" command from root to execute tests

```
grunt test
```
