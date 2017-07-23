import Ember from 'ember';

const {
  get,
  computed
} = Ember;

const upvoteActionState = 2;
const downvoteActionState = 1;

export default Ember.Component.extend({
  relatedQuestions: [],
  votes: computed('discussion.upvotesCount', 'discussion.downvotesCount', function() {
    return get(this, 'discussion.upvotesCount') - get(this, 'discussion.downvotesCount');
  }),
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
  },
  handlePreviousVoteState(actionState) {
    switch(get(this, 'discussion.voteAction')) {
      case 1:
        this.decrementProperty('discussion.downvotesCount');
        break;
      case 2:
        this.decrementProperty('discussion.upvotesCount');
        break;
    }
    this.set('discussion.voteAction', actionState);
  },
  actions: {
    upVote() {
      let currentDiscussion = this.get('discussion');
      currentDiscussion.upvote().then(() => {
        this.incrementProperty('discussion.upvotesCount');
        this.handlePreviousVoteState(upvoteActionState);
      })
    },
    downVote() {
      let currentDiscussion = this.get('discussion');
      currentDiscussion.downvote().then(() => {
        this.incrementProperty('discussion.downvotesCount');
        this.handlePreviousVoteState(downvoteActionState);
      })
    }
  }
});
