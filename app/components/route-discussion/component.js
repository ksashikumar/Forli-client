import Ember from 'ember';

const {
  get,
  computed
} = Ember;

const upvoteActionState = 2;
const downvoteActionState = 1;

export default Ember.Component.extend({
  content: null,
  relatedQuestions: [],
  globalReplyBox: true,
  answers: [
    {
      answer: {
        content: "1-asdfasdf asdfkjasdf asdfaksdfnasdkfjasdkf nasdfkjna sfdkjna sdf adfskna dfkn",
        user: {
          userId:1,
          name: 'Jack Daniels',
          image: 'http://garden.zendesk.com/css-avatars/images/jz.png',
          email: 'jack@forli.com' },
      },
      replies: [{
        content: "Reply1",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      },{
        content: "Reply2",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      }, {
        content: "Reply3",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      }]
    },
    {
      answer: {
        content: "2-asdfasdf asdfkjasdf asdfaksdfnasdkfjasdkf nasdfkjna sfdkjna sdf adfskna dfkn",
        user: {
          userId:1,
          name: 'Jack Daniels',
          image: 'http://garden.zendesk.com/css-avatars/images/jz.png',
          email: 'jack@forli.com' },
      },
      replies: [{
        content: "Reply1",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      },{
        content: "Reply2",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      }, {
        content: "Reply3",
        date: "Sun Jul 23 2017 14:49:19 GMT+0530 (IST)"
      }]
    },
  ],
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
    submitAnswer(comment) {
      let currentDiscussion = this.get('discussion');
      currentDiscussion.answer({
        "content": comment
      });
    },
    submitReply(reply, answerId) {
      let currentDiscussion = this.get('discussion');
      currentDiscussion.reply({
        "content": reply,
        "answer_id": answerId
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
