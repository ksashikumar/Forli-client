import Ember from 'ember';

const {
  Component
} = Ember;

const { service } = Ember.inject;

export default Component.extend({
  session: service('session'),
  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],
  actions: {
    authenticate() {
      let { email, password } = this.getProperties('email', 'password');
      return this.get('session').authenticate('authenticator:devise', email, password).catch((reason) => {
        this.set('errors', reason.error);
      });
    }
  }
});
