import Ember from 'ember';
import underscoreToCamelcase from '../utils/underscore-to-camelcase';
import DS from 'ember-data';

const {
 get,
 Mixin,
 inject: { service }
} = Ember;

const {
  PromiseObject
} = DS;

const searchAPI = '/discussions/search';

export default Mixin.create({
  ajax: service(),
  performSearch(params) {
    if (params.term && params.term.length > 1) {
      return PromiseObject.create({
        promise: get(this, 'ajax').put(searchAPI, {
          data: JSON.stringify(params)
        }).then((result) => {
          return underscoreToCamelcase(result);
        })
      });
    }
  }
});
