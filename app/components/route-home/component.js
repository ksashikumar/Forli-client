import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service },
  observer
} = Ember;

const perPage = 10;

export default Component.extend({
  perPage,
  shimmer: false,
  store: service(),
  meta: {},
  loadedCount: computed.reads('discussion.length'),
  totalCount: computed.reads('meta.count'),
  paramsListener: observer('params', function() {
    //  Setting page index to 1, Whenever we are getting new params,
    this.toggleProperty('shimmer');
    this.set('page', 1);
    this.loadDiscussion();
  }),
  init() {
    this._super(...arguments);
    this.loadDiscussion();
  },
  loadDiscussion() {
    let params = this.get('params');
    let paginatedData = this.get('store').query('discussion', {
      tag_ids: params.tag_ids,
      filter: params.filter
    });
    paginatedData.then((result) => {
      this.toggleProperty('shimmer');
      this.set('discussion', result);
      this.set('meta', result.get('meta'))
    }).catch(()=>{
      // catch Error
    });
  },
  page: 1,
  actions: {
    loadMore() {
      this.set('page', (this.get('page')+1));
      let paginatedData = this.get('store').query('discussion', {
        page: this.get('page'),
        limit: this.get('perPage')
      });
      paginatedData.then((result) => {
        this.set('meta', result.get('meta'));
        let discussion = this.get('discussion');
        discussion.pushObjects(result.content);
      }).catch(()=>{
        // catch Error
      });
    }
  }
});
