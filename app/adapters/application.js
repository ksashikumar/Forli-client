import ActiveModelAdapter from 'active-model-adapter';
import Ember from 'ember';
import DS from 'ember-data';

const { inject, computed } = Ember;
const { InvalidError, errorsHashToArray } = DS;

export default ActiveModelAdapter.extend({
  host: 'https://forli-api.herokuapp.com',
  //host: 'http://localhost:3000',
  namespace: "api/v1",
  forli: inject.service('forli'),
  headers: computed('forli.headers', function() {
    return this.get('forli.headers');
  }),
  handleResponse(status, headers, payload) {
    if (status === 400 && payload.errors) {
      let parseError = errorsHashToArray(payload.errors);
      return new InvalidError(parseError);
    } else {
      this.get('forli').setHeaders(headers);
      return this._super(...arguments);
    }
  }
});
