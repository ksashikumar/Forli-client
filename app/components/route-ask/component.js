import Ember from 'ember';

const {
  Component,
  inject: { service },
  get
} = Ember;

export default Component.extend({
  store: service(),
  editorContent: '',
  tagList: ['JavaScript', 'HTML', 'CSS'],
  actions: {
    basicSubmitAction() {
      let store = this.get('store');
      let discussion = store.createRecord('discussion', {
        title: this.get('title'),
        description: this.get('editorContent'),
        tags: ['forli', 'paypal', 'inmobi'],
        categoryId: '1'
      });
      discussion.save().then(() => {
        let router = get(this, 'router');
        router.transitionTo("index");
        // router.transitionTo(`forum.show.${id}`);
        // console.log('do success transition', result);
      }).catch(()=>{
        // console.log('do failure process')
      });
    }
  }
});
