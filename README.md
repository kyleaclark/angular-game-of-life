game-of-life
============

##Authored Date

April 2014

(last edit: April 2014)

##Overview

AngularJS application : evolves generations of dead or alive cells in a game board

##Setup

Install Node dependencies (Node, NPM, NVM) [Node compatible version >= 0.10.0 < 0.11.0]

```
refer to http://nodejs.org, https://www.npmjs.org/, https://github.com/creationix/nvm
```

Install Grunt dependencies [npm install -g grunt-cli]

```
refer to http://gruntjs.com/getting-started
```

Install Bower dependencies [npm install -g bower, Git via http://git-scm.com]

```
refer to http://bower.io/
```

Install Compass dependencies (Ruby, Compass, & Sass) [gem update --system && gem install compass]

```
refer to https://github.com/gruntjs/grunt-contrib-compass
```

##Build

Clone repo to local.

Use correct nvm version >= 0.10.0 < 0.11.0 (version 0.10.26 recommended) e.g.:

```
nvm use 0.10.26
```

Run "npm install" to install project dependencies from package.json:

```
npm install
```

If issues installing node packages, try the solution below. Otherwise, continue to the Prepare step.

```
sudo npm cache clean
sudo npm install
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