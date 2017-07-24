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
  sideBarDefaultViewState: computed('routeName', function() {
    let routeName = this.get('routeName');
    let minWidth = 599;
    let winWidth = window.outerWidth;
    if (routeName === 'sidebar-state-index' && winWidth < minWidth) {
      return "hide";
    } else if (routeName === 'sidebar-state-index') {
      return "show";
    } else {
      return "notindex";
    }
  }),
  init() {
    this.set('tags', []);
    this._super(...arguments);
    let limit = this.get('limit');
    this.get('store').query('tag', {limit:limit, page:1}).then((result) => {
      this.set('tags', result);
      let meta = result.get('meta');
      this.set('meta', meta);
    });
  }
});
