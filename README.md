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

Use correct nvm version >= 0.10.0 < 0.11.0 e.g.:

```
nvm use 0.10.17
```

Run "npm install" to install project dependencies from package.json:

```
npm install
```

##Run Dev-Mode

Run "grunt serve" command from root to run application locally

##Run Production-Mode

Run "grunt build" command from root to compile js, css, & html into disbrution-ready, minified code

Use http-server for node.js to run the distribution files in production-mode locally.

Install the http-server package globally:

```
npm install http-server -g
```

Open "dist" folder from root of project. Run the http-server e.g.

```
http-server -p 8000
```



