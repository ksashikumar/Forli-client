import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  meta: {},
  store: service(),
  tags: [],
  limit: 10,
  init() {
    this.set('tags', []);
    this._super(...arguments);
    let limit = this.get('limit');
    this.get('store').query('tag', {limit:limit, page:1}).then((result) => {
      this.set('tags', result);
      let meta = result.get('meta');
      this.set('meta', meta);
    });
  },
  actions: {
    askQuestion() {
      alert('Perform ask');
    }
  }
});
