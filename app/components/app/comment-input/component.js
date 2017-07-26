import Ember from 'ember';

const {
  inject: { service },
  get
} = Ember;

export default Ember.Component.extend({
  currentUser: service('current-user'),

  actions: {
    onsuccess() {
      let comment =  get(this, 'content');
      this.sendAction('onsuccess', comment);
    }
  }
});
