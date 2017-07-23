import Ember from 'ember';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend({
  forli: inject.service('forli'),
  hasUserSession: computed(function() {
    return this.get('forli').isUserLoggedIn();
  }),
  actions: {
    promptDialog() {
      this.set('forli.showLoginDialog', true);
    }
  }
});
