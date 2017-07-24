import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service }
} = Ember;

export default Component.extend({
  meta: {},
  store: service(),
  staticFiters: ["latest", "trending", "unanswered"],
  tags: [],
  limit: 10,
  filterParam: computed.reads('filters.filter'),
  filterId: computed.reads('filters.tag_ids'),
  hasFilter: computed.or('filterParam','filterId'),
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
