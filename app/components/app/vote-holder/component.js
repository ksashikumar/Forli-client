import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember

export default Component.extend({
  votes: 0,
  voteAction: 0,
  isUpVoted: computed.equal('voteAction', 2),
  isDownVoted: computed.equal('voteAction', 1),
  actions: {
    upVote() {
      if(this.attrs.upVote && !get(this, 'isUpVoted')) {
        this.sendAction('upVote');
      }
    },
    downVote() {
      if(this.attrs.downVote && !get(this, 'isDownVoted')) {
        this.sendAction('downVote');
      }
    }
  }
});
