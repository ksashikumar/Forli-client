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
  content: null,
  relatedQuestions: [],
  globalReplyBox: true,
  commentAdded: false,
  answerAdded: false,
  answers: computed('discussion.answers.[]', 'answerAdded', function() {
    return this.get('discussion.answers');
  }),
  votes: computed('discussion.upvotesCount', 'discussion.downvotesCount', function() {
    return get(this, 'discussion.upvotesCount') - get(this, 'discussion.downvotesCount');
  }),
  init() {
      this._super(...arguments);
      window.scrollTo(0,0);
      this.getSimilarQuestions();
      this.updateViewCount();
  },

  getSimilarQuestions() {
    let currentDiscussion = this.get('discussion');
    currentDiscussion.similar().then((similarQuestions) => {
      let returnObj = get(similarQuestions, 'discussions');
      this.set('relatedQuestions',returnObj);
    })
  },
  updateViewCount() {
    let currentDiscussion = this.get('discussion');
    currentDiscussion.updateViewCount();
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
    submitAnswer(content) {
      this.set('answerAdded', false);
      let discussionId = this.get('discussion.id');
      let answer = this.get('store').createRecord('answer', {
        discussionId,
        content: content,
      });
      answer.save().then((result) => {
        let discussion = this.get('discussion.answers');
        let obj = result.get('data');
        obj.id = result.get('id');
        discussion.pushObject(obj);
        this.set('content', null);
        this.toggleProperty('answerAdded');
      }).catch(()=>{
        // console.log('do failure process')
      });
    },
    submitReply(comment, answerId) {
      let reply = this.get('store').createRecord('reply', {
        answerId,
        content: comment
      });
      reply.save().then(() => {
        this.set('content', null);
        this.toggleProperty('answerAdded');
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
