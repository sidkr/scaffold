import Backbone from 'backbone';
import _ from 'underscore';
import AppMainView from "../views/AppMainView";
import BaseRouter from './BaseRouter';
// import { getCookie } from '../helpers/CommonUtil';

function renderMainLayout(layout = {}, configs = {}) {
  new AppMainView({
    layout,
    configs
  });
}
let Router = BaseRouter.extend({

  // renderMainLayout() {
  //   new AppMainView({
  //     el: "#app-hook"
  //   }).render();
  // },

  routes: {
    '': 'default',
  },


  // Routes that need authentication and if user is not authenticated
  // gets redirect to login page
  requresAuth: ["#home", "#profile", "#search", "#settings", "#post"],
  // requresAuth: [], //USE ONLY FOR DEBUG

  // Routes that should not be accessible if user is authenticated
  // for example, login, register, forgetpasword ...
  preventAccessWhenAuth: ["#login", "#signup", "#welcome"],

  before: function(params, next) {
    let path = Backbone.history.location.hash;
    let needAuth = _.contains(this.requresAuth, path);
    let cancleAccess = _.contains(this.preventAccessWhenAuth, path);
    // const authCookie =  getCookie('sectok');

    // let isAuth = authCookie ? true : false;
    let isAuth = true;


    if (needAuth && !isAuth) {
      //If user gets redirect to login because wanted to access
      // to a route that requires login, save the path in session
      // to redirect the user back to path after successful login
      Backbone.history.navigate("welcome", {
        trigger: true
      });
    } else if (isAuth && cancleAccess) {
      //User is authenticated and tries to go to login, register ...
      // so redirect the user to home page
      Backbone.history.navigate("home", {
        trigger: true
      });
    } else {
      //No problem handle the route
      return next();
    }
  },


  //Routes
  default(){
    renderMainLayout();
  }  

});

export default Router;