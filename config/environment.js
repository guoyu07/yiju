/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'Yiju',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    apiUrls: {
        list: 'list',
        song: 'song/',
        add: 'add/',
        delete: 'delete/',
        connect: 'connect/',
        user: 'users',
        adduser: 'adduser',
        login: 'login',
        check: 'checkuser/'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  ENV['simple-auth'] = {
    authorizer: 'authorizer:custom',
    //store: 'simple-auth-session-store:cookie', // optional
    crossOriginWhitelist: ['http://localhost'],
    routeAfterAuthentication: 'list'
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval'",
    'font-src': "*",
    'connect-src': "*",
    'img-src': "'self' data:",
    'style-src': "'self' 'unsafe-inline'",
    'media-src': "'self'"
  };

  if (environment === 'development') {
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

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
