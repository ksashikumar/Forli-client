import Ember from 'ember';

const {
  Route,
  RSVP
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
    return RSVP.hash({
      params: params,
      discussion: this.get('store').query('discussion', {
        tag_ids: params.tag_ids,
        filter: params.filter
      })
    });
  },
});
