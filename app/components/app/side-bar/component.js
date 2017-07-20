import Ember from 'ember';

export default Ember.Component.extend({
    // Fetch categories and tags
    categories: [{"id":"1", "name":"Programming"},{"id":"2", "name":"Design"},{"id":"3", "name":"Development"},{"id":"4", "name":"Testing"},{"id":"5", "name":"Devops"}],
    tags: [{"id":"1", "name":"Javascript"},{"id":"2", "name":"Ember"},{"id":"3", "name":"HTML"},{"id":"4", "name":"Angular"},{"id":"5", "name":"PHP"}],

    actions: {
    askQuestion() {
      alert('Perform ask');
    }
  }
});
