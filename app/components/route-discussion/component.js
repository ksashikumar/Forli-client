import Ember from 'ember';

const {
  get,
  computed,
  inject: { service }
} = Ember;

const upvoteActionState = 2;
const downvoteActionState = 1;

export default Ember.Component.extend({
  store: service(),
  currentUser: service('current-user'),
  content: null,
  relatedQuestions: [],
  globalReplyBox: true,
  answerData: computed('discussion.answers.[]', {
    get() {
      let discussionId = get(this, 'discussion.id');
      return get(this, 'store').query('answer', {
        discussion_id: discussionId
      });
    }
  }),
  answers: computed('answerData.content', {
    get() {
      return this.get('answerData.content');
    },
    set(key, value) {
      return value
    }
  }),
  votes: computed('discussion.upvotesCount', 'discussion.downvotesCount', function() {
    return get(this, 'discussion.upvotesCount') - get(this, 'discussion.downvotesCount');
  }),
  init() {
      this._super(...arguments);
      window.scrollTo(0,0);
      this.getSimilarQuestions();
  },

  getSimilarQuestions() {
    let currentDiscussion = this.get('discussion');
    currentDiscussion.similar().then((similarQuestions) => {
      let returnObj = get(similarQuestions, 'discussions');
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
    submitAnswer(comment) {
      let discussionId = this.get('discussion.id');
      let answer = this.get('store').createRecord('answer', {
        discussionId,
        content: comment
      });
      answer.save().then((result) => {
        let answers = this.get('answers.content');
        answers.pushObject(result._internalModel);
        this.set('content', null);
      }).catch(()=>{
        // console.log('do failure process')
      });
    },
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
    },
    showGlobalReply() {
      this.toggleProperty('globalReplyBox');
    },
  }
});
