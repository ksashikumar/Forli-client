import Ember from 'ember';
import underscoreToCamelcase from '../utils/underscore-to-camelcase';
import DS from 'ember-data';

const {
 Route,
 RSVP,
 get,
 inject: { service }
} = Ember;

const {
  PromiseObject
} = DS;

const searchAPI = 'https://forli-api.herokuapp.com/api/v1/discussions/search';
export default Route.extend({
  ajax: service(),
  queryParams: {
    term: { refreshModel: true },
    page: { refreshModel: true },
    limit: { refreshModel: true },
  },
  model(params) {
    return RSVP.hash({
      params,
      discussion: this.performSearch(params)
    });
  },
  performSearch(params) {
    if (params.term && params.term.length > 1) {
      return PromiseObject.create({
        promise: get(this, 'ajax').post(searchAPI, {
          data: params
        }).then((result) => {
          return underscoreToCamelcase(result);
        })
      });
    }
  }
});
