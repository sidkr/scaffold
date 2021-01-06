import Backbone from "backbone";
import Marionette from "backbone.marionette";
import Router from "./routers/Router";
import "./scss/main.scss";

const MnApp = Marionette.Application.extend({
  region: "#app-main",

  initialize() {
    Backbone.history.stop();
  },
  onStart: function () {
    //Register all common helpers/partials
    this.router = new Router();
    Backbone.history.start({});
  },
});

const app = new MnApp();
window.App = app;
app.start();
