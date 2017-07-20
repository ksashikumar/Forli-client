import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: '',
  initial: computed('name', function() {
    let userName = this.get('name');
    console.log('userName', userName);
    return userName.trim().charAt(0);
  }),
});
