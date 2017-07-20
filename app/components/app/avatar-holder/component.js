import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: '',
  initial: computed('name', function() {
    let userName = this.get('name');
    return userName.trim().charAt(0);
  }),
});
