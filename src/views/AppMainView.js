import Marionette from 'backbone.marionette';
import $ from 'jquery';
// import { isMobile } from "../helpers/CommonUtil";
import template from '../templates/appMainView.hbs';

export default Marionette.LayoutView.extend({
  el: '#app-main',

  template,

  regions: {
    main: {
      el: '#app-hook',
      allowMissingEl: true,
    },
  },

  initialize(options) {
    this.options = options;

    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('navbarTop').style.top = '0';
      } else {
        document.getElementById('navbarTop').style.top = '-80px';
      }
      prevScrollpos = currentScrollPos;
    };

    this.render();
  },

  serializeData() {
    return this.options;
  },

  /**
   * @description onRender post Mn View is rendered
   *              This method is used by both server side (ssr) and client side rendered pages.
   *              In the event of a view not needing the left nav an optional argument can be passed
   *              wrap the leftNav invocation below.
   */
  onRender() {
    // const Layout = this.options.layout.default;
    // const pageName = this.options.configs.pageName;
    // const layoutConfig = {
    //   el: "#section-container",
    //   parentView: this,
    //   options: this.options,
    //   pageName
    // };
    // this.getRegion("main").show(new Layout(layoutConfig));
    // $('nav a[href^="' + location.hash + '"]').addClass("active");
  },
});
