import Ember from 'ember';

export default Ember.Component.extend({
    // Fetch categories and tags
    categories: [{"id":"1", "name":"Programming"},{"id":"2", "name":"Design"},{"id":"2", "name":"Development"}],
    tags: [{"id":"1", "name":"Javascript"},{"id":"2", "name":"Ember"},{"id":"2", "name":"HTML"}],

    actions: {
    askQuestion() {
      alert('Perform ask');
    }
  }
});
