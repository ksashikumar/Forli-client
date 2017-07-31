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
  title: '',
  init() {
    this._super(...arguments);
    this.set('tags', []);
  },
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
      let tags = this.get('tags');
      let discussion = store.createRecord('discussion', {
        title: this.get('title'),
        description: this.get('editorContent'),
        userId: userData.userId,
        tags: tags
        // TODO: If needed, We'll enable this feature
        // categoryId: '1'
      });
      discussion.save().then((result) => {
        let router = get(this, 'router');
        let discussionId = result.get('id');
        router.transitionTo("discussion", discussionId);
        // router.transitionTo(`forum.show.${id}`);
        // console.log('do success transition', result);
      }).catch(()=>{
        // console.log('do failure process')
      });
    }
  }
});
