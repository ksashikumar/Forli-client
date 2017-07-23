import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  showSearchBar: false,
  actions: {
    toggleSearch() {
      this.toggleProperty('showSearchBar')
    }
  }
});
