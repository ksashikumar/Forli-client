import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: 'https://forli-api.herokuapp.com/api/v1/sign_in',
  serverLogoutEndpoint: 'https://forli-api.herokuapp.com/api/v1/sign_out',
  // serverTokenEndpoint: 'http://localhost:3000/api/v1/sign_in',
  // serverLogoutEndpoint: 'http://localhost:3000/api/v1/sign_out',

  invalidate: function() {
    return Ember.$.ajax({
      url:  this.serverLogoutEndpoint,
      type: 'DELETE'
    });
  }

});