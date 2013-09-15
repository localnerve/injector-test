var path = require("path");
var injector = require("connect-injector");
var inject = require("./server/inject");

module.exports = function(grunt) {

  // project configuration
  var projectConfig = {
    test: {
      // disable injector in mw stack by setting this false
      useInjector: true,
      // disable actual inject by setting this true
      neverInject: false
    },
    app: "app",
    server: "server",
    port: {
      test: 9000
    }
  };

  // load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Grunt config
  grunt.initConfig({

    project: projectConfig,

    // bower task provided by grunt-bower-requirejs
    bower: {
      all: {
        rjsConfig: "<%= project.app %>/config.js"
      }
    },

    // connect webserver provided by grunt-contrib-connect
    connect: {
      options: {
        hostname: "localhost"
      },
      testInteractive: {
        options: {
          port: "<%= project.port.test %>",
          keepalive: true,
          middleware: function(connect) {
            var useInjector = grunt.config.process("<%= project.test.useInjector %>");
            var neverInject = grunt.config.process("<%= project.test.neverInject %>");
            var stack = [];
            if (useInjector) {
              var condition = neverInject ? inject.falseCondition : inject.condition;
              stack.push(injector(condition, inject.responder));
            }
            stack.push(connect.static(path.resolve(".")));
            return stack;
          }
        }
      }
    },

    // Task provided by grunt-contrib-jshint.
    jshint: {
      files: [
        "Gruntfile.js", "<%= project.app %>/**/*.js", "<%= project.server %>/**/*.js"
      ]
    }
  });

  // to rewire config.js, run grunt bower
  // to lint, runt grunt jshint

  // Start the test server
  // to test, just run grunt with no args and navigate to localhost:9000
  // to reproduce the problem, hit F5.
  grunt.registerTask("default", ["connect:testInteractive"]);

};
