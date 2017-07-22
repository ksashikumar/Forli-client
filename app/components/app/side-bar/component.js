import Ember from 'ember';
import tagColors from 'forli/constants/tag-colors';

const {
  Component,
  inject: { service }
} = Ember;

// const tagColors = ['#22A7F0', '#26A65B', '#F3C13A', '#DC3023', '#F58F84', '#CF000F', '#E68364', '#757D75', '#CF3A24', '#9B59B6', '#4DAF7C'];

export default Component.extend({
  tagColors,
  store: service(),
  tags: [],
  init() {
    this._super(...arguments);
    let tags = this.get('store').findAll('tag');
    this.set('tags', tags);
  },
  actions: {
    askQuestion() {
      alert('Perform ask');
    }
  }
});
