import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  userId: attr(),
  user: attr(),
  tags: attr(),
  categoryId: attr(),
  posts: attr(),
  viewCount: attr(),
  postsCount: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  downvotesCount: attr(),
  upvotesCount: attr(),
  voteAction: attr(),
  similar: memberAction({ path: 'similar' }),
  upvote: memberAction({ path: 'upvote' }),
  downvote: memberAction({ path: 'downvote' }),
  answers: attr(),
  updateViewCount: memberAction({ path: 'view' })
});
