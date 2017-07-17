import Ember from 'ember';

const {
  Component,
  $
} = Ember

export default Component.extend({
  click(event) {
    this.handleBurgerMenu(event);
  },
  handleBurgerMenu(event) {
    let routerName = Ember.getOwner(this).lookup('controller:application').currentPath;
    let burgerMenu = $(event.target).parents('.burger-menu');
    if(burgerMenu.length) {
      if(routerName === 'index') {
        let isIndexRoute = $('.app-wrapper').hasClass('router-index');
        if(isIndexRoute) {
          this.showOrHideNavBar(true);
          $('.app-wrapper').removeClass('router-index');
        } else {
          this.showOrHideNavBar(false);
          $('.app-wrapper').addClass('router-index');
        }
      } else {
        let navIsVisible = $('.side-navbar').hasClass('show');
        this.showOrHideNavBar(navIsVisible);
      }
    }
  },
  showOrHideNavBar(isVisible) {
    if(isVisible) {
      $('.side-navbar').addClass('hide');
      $('.side-navbar').removeClass('show');
    } else {
      $('.side-navbar').addClass('show');
      $('.side-navbar').removeClass('hide');
    }
  }
});
