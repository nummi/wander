/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-qunit': {
      useLintTree: false
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    babel: {
      optional: ['es7.decorators']
    }
  });

  app.import(app.bowerDirectory + '/moment/moment.js');
  app.import(app.bowerDirectory + '/jquery.scrollTo/jquery.scrollTo.min.js');

  // jQuery UI
  app.import(app.bowerDirectory + '/jquery-ui/ui/core.js');
  app.import(app.bowerDirectory + '/jquery-ui/ui/widget.js');

  // FileUpload
  // (has jquery.ui.widget.js dependency, imported above with jQuery UI)
  app.import('vendor/jquery.iframe-transport.js');
  app.import('vendor/jquery.fileupload/jquery.fileupload.css');
  app.import('vendor/jquery.fileupload/jquery.fileupload.js');

  return app.toTree();
};
