import Ember from 'ember';

export default Ember.Component.extend({
  showReply: false,
  replyContent: null,
  actions :{
    enableReply() {
      this.sendAction('onReplyEnabled');
      this.toggleProperty('showReply');
    },
    submitReply(reply) {
      this.sendAction('onReply', reply);
    }
  }
});
