#academic_homepage
A simple homepage for academic use, based on AngularJS and Bootstrap.

## Features
* Lightweight.
* Creates a searchable list of publications from a `.bib` file.
* Includes node scripts for streamlined development with livereload etc.
* Connects to Strava to obtain recent workouts

## Publication list
If the `.bib` file has entries named "Abstract" (text), "Url" (url) or "Slides" (url), the information will be appended to the publication list. Currently, there is support for @article, @inproceedings, @mastersthesis, @phdthesis, @book, and @inbook.

## Strava
In order to access the Strava API a personal access token must be obtain, which can be done [here](http://www.strava.com/settings/apps). Enter the access token, and your Strava athlete ID in `strava.js`. The authentication process is not implemented, since it is impossible to hide the access token in a client-side app anyway.

Note that this exposes the access token publicly on the web, which could allow others to abuse it. As long as the access token is public and not used for another app, this should not be a problem.

## Installation
To set up the webpage on an existing server, just copy the content of `public` into your `public_html` folder and start editing the files in `html`.

For easy development/personalization, clone the repo and do
```
npm install
grunt
```
This launches a local web server and opens the webpage in an auto-refreshing browser.

## Live demo
http://web.eecs.umich.edu/~pettni
