import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  store: inject.service(),
  init() {
    this._super(...arguments);
    let testData = this.get('store').findAll('discussion');
    console.log('testData', testData);
  }
});
