import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  descriptionText: attr('string'),
  userId: attr(),
  user: attr(),
  tags: attr(),
  categoryId: attr(),
  posts: attr(),
  viewCount: attr(),
  answersCount: attr(),
  postsCount: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  downvotesCount: attr(),
  upvotesCount: attr(),
  voteAction: attr(),
  similar: memberAction({ path: 'similar' }),
  upvote: memberAction({ path: 'upvote' }),
  downvote: memberAction({ path: 'downvote' }),
  answers: hasMany('answer'),
  sentiment: attr(),
  correctAnswerId: attr()
});
