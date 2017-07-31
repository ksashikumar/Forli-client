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
  correctAnswerId: computed.reads('discussion.correctAnswerId'),
  isMarked: computed('answer', 'discussion.correctAnswerId', function() {
    let answerId = get(this, 'answer.id')
    let correctAnswerId = get(this, 'discussion.correctAnswerId')
    return (answerId == correctAnswerId);
  }),
  replyData: computed('answer.[]', {
    get() {
      let answerId = this.get('answer.id')
      let replies = this.get('store').query('reply', {
        answer_id: answerId
      });
      return replies;
    }
  }),
  replies: computed('replyData.content', {
    get() {
      return this.get('replyData.content');
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
      let discussionId = this.get('answer.discussionId');
      currentAnswer.upvote({ discussion_id: discussionId }).then(() => {
        this.incrementProperty('answer.upvotesCount');
        this.handlePreviousVoteState(upvoteActionState);
      })
    },
    downVote() {
      let currentAnswer = this.get('answer');
      let discussionId = this.get('answer.discussionId');
      currentAnswer.downvote({ discussion_id: discussionId }).then(() => {
        this.incrementProperty('answer.downvotesCount');
        this.handlePreviousVoteState(downvoteActionState);
      })
    },
    markCorrect() {
      let currentAnswer = get(this, 'answer');
      let discussionId  = get(this, 'answer.discussionId');
      let discussion    = get(this, 'discussion');
      currentAnswer.markCorrect({ discussion_id: discussionId }).then(() => {
        discussion.setProperties({ correctAnswerId: currentAnswer.id })
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
      reply.save().then((result) => {
        let replies = this.get('replies.content');
        replies.pushObject(result._internalModel);
        this.set('replyContent', null);
      }).catch(()=>{
        // console.log('do failure process')
      });
    }
  }
});
