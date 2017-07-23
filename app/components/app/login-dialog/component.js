import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  email: null,
  password: null,
  store: inject.service(),
  forli: inject.service('forli'),
  errors: null,
  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],
  actions: {
    closeDialogWithParent() {
      this.setProperties({email: null, password: null});
      this.set('forli.showLoginDialog', false);
      this.set('errors', null);
    },
    basicSubmitAction() {
      this.set('errors', null);
      this.get('store').createRecord('auth').signIn({
        email: this.get('email'),
        password: this.get('password')
      }).then((response) => {
        this.set('forli.userLoggedIn', true);
        this.set('userName', response.name);
        this.send('closeDialogWithParent');
      }).catch((response)=> {
        this.set('errors', response.errors);
      });
    }
  }
});
