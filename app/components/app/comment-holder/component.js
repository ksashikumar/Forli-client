// TODO Move the common voting code into a mixin post demo

import Ember from 'ember';
const {
  computed,
  inject: { service },
  get
} = Ember;

const upvoteActionState = 2;
const downvoteActionState = 1;

export default Ember.Component.extend({
  store: service(),
  showReply: false,
  replyContent: null,
  replyComment: false,
  replies: computed('answer.[]', 'replyComment', {
    get() {
      let answerId = this.get('answer.id')
      return this.get('store').query('reply', {
        answer_id: answerId
      });
    },
    set(key, value) {
      return value
    }
  }),
  votes: computed('answer.upvotesCount', 'answer.downvotesCount', function() {
    return get(this, 'answer.upvotesCount') - get(this, 'answer.downvotesCount');
  }),
  handlePreviousVoteState(actionState) {
    switch(get(this, 'answer.voteAction')) {
      case 1:
        this.decrementProperty('answer.downvotesCount');
        break;
      case 2:
        this.decrementProperty('answer.upvotesCount');
        break;
    }
    this.set('answer.voteAction', actionState);
  },
  actions: {
    upVote() {
      let currentAnswer = this.get('answer');
      currentAnswer.upvote().then(() => {
        this.incrementProperty('answer.upvotesCount');
        this.handlePreviousVoteState(upvoteActionState);
      })
    },
    downVote() {
      let currentAnswer = this.get('answer');
      currentAnswer.downvote().then(() => {
        this.incrementProperty('answer.downvotesCount');
        this.handlePreviousVoteState(downvoteActionState);
      })
    },
    enableReply() {
      this.sendAction('onReplyEnabled');
      this.toggleProperty('showReply');
    },
    submitReply(comment) {
      let answerId = this.get('answer.id')
      let reply = this.get('store').createRecord('reply', {
        answerId,
        content: comment
      });
      reply.save().then(() => {
        this.set('replyContent', null);
        this.toggleProperty('replyComment');
        // this.get('replies').pushPayload(result);
      }).catch(()=>{
        // console.log('do failure process')
      });
    }
  }
});
