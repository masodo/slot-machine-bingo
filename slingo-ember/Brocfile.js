var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// https://github.com/stefanpenner/ember-cli/issues/777
var fontTree = pickFiles('vendor/fontawesome/fonts', {
  srcDir: '/',
  files: ['fontawesome-webfont.eot','fontawesome-webfont.ttf','fontawesome-webfont.svg','fontawesome-webfont.woff'],
  destDir: '/assets/fonts'
});

app.import('vendor/bootstrap/dist/css/bootstrap.css');
module.exports = mergeTrees([app.toTree(), fontTree]);
