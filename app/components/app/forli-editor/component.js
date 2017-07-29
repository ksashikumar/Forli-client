import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  mediumEditorOptions: {
    paste: {
      forcePlainText: false,
      cleanPastedHTML: false,
      cleanReplacements: [],
      cleanAttrs: ['class', 'style', 'dir'],
      cleanTags: ['meta'],
      unwrapTags: []
    },
    placeholder: {
      text: 'Enter description',
      hideOnClick: true
    },
    "checkLinkFormat": true,
  },
  actions : {
    onFinishedTyping() {
      // console.log('byPass to parent component');
    }
  }

});
