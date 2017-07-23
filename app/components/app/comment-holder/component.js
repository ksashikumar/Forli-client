import Ember from 'ember';
const {
  computed,
  inject: { service }
} = Ember;

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
  actions :{
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
