#academic_homepage

A simple homepage for academic use, based on AngularJS and Bootstrap.

## Features

* Lightweight.
* Creates a list of publications from a `.bib` file.
* Included node scripts for development with livereload etc.

## Publication list
If the `.bib` file has entries named "Abstract" (text), "Pdf" (address) or "Slides" (address), the information will be appended to the publication list. Currently, there is support for @inproceedings, @article and @mastersthesis.

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
