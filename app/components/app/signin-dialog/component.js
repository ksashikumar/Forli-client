import Ember from 'ember';

const {
  Component,
  inject
} = Ember;

export default Component.extend({
  name: null,
  email: null,
  password: null,
  confirmpassword: null,
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
      this.set('forli.showSigninDialog', false);
      this.set('errors', null);
    },
    basicSubmitAction() {
      if(this.get('confirmpassword') != this.get('password')) {
        this.set('errors', ['Please enter valid password']);
        return;
      }
      this.set('errors', null);
      let auth = this.get('store').createRecord('auth', {
        email: this.get('email'),
        name: this.get('name'),
        password: this.get('password'),
        confirmPassword: this.get('passwordConfirmation')
      });
      auth.save().then((response) => {
        debugger
        this.send('closeDialogWithParent');
        window.location.href='/';
      }).catch((response)=> {
        debugger
        this.set('errors', response.errors);
      });
    }
  }
});
