import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  userId: attr(),
  user: attr(),
  tags: hasMany('tag'),
  categoryId: attr(),
  posts: attr(),
  views: attr(),
  postsCount: attr(),
  createdAt: attr(),
  updatedAt: attr(),
});
