import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  userId: attr(),
  user: attr(),
  tags: attr(),
  categoryId: attr(),
  posts: attr(),
  views: attr(),
  postsCount: attr(),
  createdAt: attr(),
  updatedAt: attr(),
});
