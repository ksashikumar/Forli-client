import Ember from 'ember';

const {
  Component,
  inject,
  computed
} = Ember;

export default Component.extend({
  items: [{icon: '', title: 'Signout'}],
  store: inject.service('store'),
  bringBack: computed('forli.showLoginDialog', 'forli.showSigninDialog',function() {
    return this.get('forli').showLoginDialog || this.get('forli').showSigninDialog
  }),
  hasUserSession: computed(function() {
    return this.get('forli').isUserLoggedIn();
  }),
  actions: {
    promptDialog() {
      this.set('forli.showLoginDialog', true);
    },
    signOut() {
      this.get('store').createRecord('auth').signOut().then(() => {
        window.location.href="/";
      });
    },
    promptSigninDialog() {
      this.set('forli.showSigninDialog', true);
    }
  }
});
