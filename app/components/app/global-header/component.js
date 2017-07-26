import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

const { service } = Ember.inject;

export default Component.extend({
  currentUser: service('current-user'),
  session: service('session'),
  forli: inject.service('forli'),
  actions: {
   logout() {
      this.get('session').invalidate();
    }
  }
});
