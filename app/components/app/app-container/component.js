import Ember from 'ember';

const {
  Component,
  $,
  inject
} = Ember

export default Component.extend({
  forli: inject.service('forli'),
  click(event) {
    this.handleBurgerMenu(event);
    this.handleSearchClose(event);
  },
  handleBurgerMenu(event) {
    let routerName = Ember.getOwner(this).lookup('controller:application').currentPath;
    let burgerMenu = $(event.target).parents('.burger-menu').length;
    if(burgerMenu) {
      if(routerName === 'index') {
        let isIndexRoute = $('.app-wrapper').hasClass('router-index');
        let isSidebarOpen = $('.side-navbar').hasClass('show');
        if(isIndexRoute && isSidebarOpen) {
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
  handleSearchClose(event) {
    let ClickIsfromSearchHolder = $(event.target).parents('.search-wrapper').length;
    if(ClickIsfromSearchHolder === 0) {
      let clickIsFromSearchBtn = $(event.target).parents('.global-search').length;
      if (clickIsFromSearchBtn) {
        this.toggleProperty('forli.searchEnabled')
      } else {
        this.set('forli.searchEnabled', false);
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
