define([
  "jquery",
  "requirejs-text!templates/app.html"
  ], function($, html) {

  function start() {
    $("#main").html(html);
  }

  return {
    start: start
  };
});