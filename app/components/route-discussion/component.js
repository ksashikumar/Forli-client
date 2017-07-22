import Ember from 'ember';

export default Ember.Component.extend({
  init() {
      this._super(...arguments);
      window.scrollTo(0,0);
  }
});
