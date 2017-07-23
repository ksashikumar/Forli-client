import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onsuccess() {
      let comment =  this.get('content');
      this.sendAction('onsuccess', comment);
    }
  }
});
