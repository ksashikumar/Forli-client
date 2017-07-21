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
  tags: [],
  actions: {
    removeCustomItem(tag) {
      var tagsArray = this.get('tags');
      tagsArray.removeObject(tag);
    },
    addCustomItem(tag) {
      var tagsArray = this.get('tags');
      if(!tagsArray.includes(tag)) {
        tagsArray.pushObject(tag);
      }
    },
    basicSubmitAction() {
      let userData = this.userInfo.data;
      let store = this.get('store');
      let discussion = store.createRecord('discussion', {
        title: this.get('title'),
        description: this.get('editorContent'),
        tags: this.get('tags'),
        userId: userData.userId
        // TODO: If needed, We'll enable this feature
        // categoryId: '1'
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
