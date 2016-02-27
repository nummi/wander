/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'wander',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval'", // loading visualEditor via getScript
      'font-src': "'self'",
      'connect-src': "'self'",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com",
      'style-src': "'self' 'unsafe-inline'", // Allow inline styles
      'media-src': "'self'"
    },

    services: {
      foursquare: {
        fake: false,
        config: {
          clientId: 'JIVBLDT2LB0JJWNRAZNOE42B4VDRWB0KGADJPCGRHLIUJKVZ',
          clientSecret: 'DZGYBBUYTEKITZMFL4CUC0V5F0DZJ4L3KPLPST1VOERUOYBS'
        }
      },

      geolocation: {
        fake: false,
      },

      worldWeatherOnline: {
        fake: false,
        config: {
          key: '4bb4eba8c8e3e0eca68cf4698bb0e'
        }
      }
    },

    googleMap: {
      apiKey: 'AIzaSyAsDhesK7jQMtm6uRRy0QdHxzmSiRT1aB4'
    }
  };

  if (environment === 'development') {
    ENV.host = 'http://localhost:3000';

    if(Error && Error.stackTraceLimit) {
      Error.stackTraceLimit = 50;
    }

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    ENV['ember-cli-mirage'] = {
      enabled: true
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.host = 'http://wander-server.herokuapp.com';
  }

  if (environment === 'staging') {
    ENV.host = 'http://wander-server.herokuapp.com';
  }

  return ENV;
};
