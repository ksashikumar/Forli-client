import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  queryParams: {
    tag_ids: {
      refreshModel: true,
      replace: true
    },
    filter: {
      refreshModel: true,
      replace: true
    },
  },
  model(params) {
    this.controllerFor('application').set('filters', params);
    if(params.tag_ids || params.filter) {
      return this.get('store').query('discussion', {
        tag_ids: params.tag_ids,
        filter: params.filter
      });
    } else {
      return this.store.findAll('discussion');
    }

  },
});
