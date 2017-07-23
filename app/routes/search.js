import Ember from 'ember';
import ModalRouteMixin from 'ember-routable-modal/mixins/route';
import underscoreToCamelcase from '../utils/underscore-to-camelcase';
import DS from 'ember-data';

const {
 Route,
 RSVP,
 get
} = Ember;

const {
  PromiseObject
} = DS;

const searchAPI = 'api/v1/discussions/search';
export default Route.extend(ModalRouteMixin, {
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
          data: JSON.stringify(params)
        }).then((result) => {
          return underscoreToCamelcase(result);
        })
      });
    }
  }
});
