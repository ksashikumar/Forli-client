import Ember from 'ember';

const {
  Component,
} = Ember;

export default Component.extend({
  descriptionTruncateLimit: 200,
  tagList: ['veri', 'veri', 'sathipan'],
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
});
