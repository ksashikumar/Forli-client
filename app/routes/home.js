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
  // model(params) {
  //   // Since home page moved to separate route
  //   // We are linked home page params to service (refer service -> forli.params)
  //   this.set('forli.params', params);
  //
  //   return RSVP.hash({
  //     params: params,
  //     discussion: this.get('store').query('discussion', {
  //       tag_ids: params.tag_ids,
  //       filter: params.filter
  //     })
  //   });
  // },
  model(params) {
    // Since home page moved to separate route
    // We are linked home page params to service (refer service -> forli.params)
    this.set('forli.params', params);
    return {
      params: params
    }
  },
});
