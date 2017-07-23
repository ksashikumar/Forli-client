import Ember from 'ember';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend({
  showSearchBar: false,
  forli: inject.service('forli'),
  hasUserSession: computed(function() {
    return this.get('forli').isUserLoggedIn();
  }),
  actions: {
    toggleSearch() {
      this.toggleProperty('showSearchBar')
    },
    promptDialog() {
      this.set('forli.showLoginDialog', true);
    }
  }
});
