import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  inProgress: false,
  hasMoreContent: computed('totalCount', 'loadedCount', function() {
    this.set('inProgress', false);
    let totalCount = this.get('totalCount');
    let loadedCount = this.get('loadedCount');
    return (totalCount > loadedCount);
  }),
  actions: {
    lodaMore() {
      this.set('inProgress', true);
      this.sendAction('loadMore');
    },
  }
});
