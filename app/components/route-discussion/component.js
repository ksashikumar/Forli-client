import Ember from 'ember';

const {
  get
} = Ember;

export default Ember.Component.extend({
  relatedQuestions: [],
  init() {
      this._super(...arguments);
      window.scrollTo(0,0);
      this.getSimilarQuestions()
  },

  getSimilarQuestions() {
    let currentDiscussion = this.get('discussion');
    currentDiscussion.similar().then((similarQuestions) => {
      let returnObj = get(similarQuestions, 'discussions');
      // this.get('store').pushPayload(returnObj);
      this.set('relatedQuestions',returnObj);
    })
  }
});
