# Yiju

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.
## TODO
* site edit (including slogan, index page background page)
* new index page (ref to 15yan.com index page)
* new personal page
* add admin modify page (done)
* create collection by user, collections contains several songs (done)
* user level (done, admin can change user role in edit page)
* new collection route and page (done)
* post collection desc using markdown (done)
* post collection pic using upload plugin and do some resize works (done using gm)
* new html5 player plugin development and styling (done)
* lyric fetching and format (done, using phantomjs to fetch from 163 webpage)
* album pic resizing and save to local (param=130y130 done)
* detail page share using wechat https://github.com/soldair/node-qrcode
* detail page commit using third party widget (youyan)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
