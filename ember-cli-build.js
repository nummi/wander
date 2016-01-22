var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-cli-qunit': {
      useLintTree: false
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

  return app.toTree();
};