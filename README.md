#academic_homepage

A simple homepage for academic use, based on AngularJS and Bootstrap.

## Features

* Lightweight.
* Creates a list of publications from a `.bib` file.
* Includes node scripts for streamlined development with livereload etc.

## Publication list
If the `.bib` file has entries named "Abstract" (text), "Url" (url) or "Slides" (url), the information will be appended to the publication list. Currently, there is support for @inproceedings, @article, @mastersthesis and @phdthesis.

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
