import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  descriptionTruncateLimit: 170,
  updatedDescription: computed('discussion.description', function() {
    let desc = this.get('discussion.description');
    var span= document.createElement('span');
    span.innerHTML= desc;
    return span.textContent || span.innerText;
  }),
});
