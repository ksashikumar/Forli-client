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
    // Since home page moved to separate route
    // We are linked home page params to service (refer service -> forli.params)
    this.set('forli.params', params);
    return {
      params: params
    }
  },
});
