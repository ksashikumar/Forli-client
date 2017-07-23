import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  host: 'https://forli-api.herokuapp.com',
  // host: 'http://localhost:4000',
  namespace: "api/v1",
  headers: Ember.computed(function(){
    let headers = {};
    headers['Content-Type'] = 'application/json; charset=utf-8';
    return headers;
  })
});
