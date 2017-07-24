import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: '',
  descriptionTruncateLimit: 170,
  updatedDescription: computed('discussion.description', function() {
    let desc = this.get('discussion.description');
    var span= document.createElement('span');
    span.innerHTML= desc;
    return span.textContent || span.innerText;
  }),
  sentimentAnalysis: computed('discussion.sentiment', function() {
    let sentimentScore = this.get('discussion.sentiment');
    if (sentimentScore >= -1 && sentimentScore < -0.3) {
      return "sad";
    } else if(sentimentScore >= -0.3 && sentimentScore <= 0.3) {
      return "neutral";
    } else {
      return "happy";
    }
  }),
  sentimentText: computed('discussion.sentiment', function() {
    let sentimentScore = this.get('discussion.sentiment');
    let message = '';
    if (sentimentScore >= -1 && sentimentScore < -0.3) {
      message = (sentimentScore*-100)+"% Sad";
    } else if(sentimentScore >= -0.3 && sentimentScore <= 0.3) {
      message ="neutral";
    } else {
      message = (sentimentScore*100)+"% Happy";
    }
    return message;
  }),
});
