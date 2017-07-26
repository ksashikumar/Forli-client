import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  serverTokenEndpoint: 'https://forli-api-dev.herokuapp.com/api/v1/sign_in',
  serverLogoutEndpoint: 'https://forli-api-dev.herokuapp.com/api/v1/sign_out',
  invalidate: function() {
    return Ember.$.ajax({
      url:  this.serverLogoutEndpoint,
      type: 'DELETE'
    });
  }

});