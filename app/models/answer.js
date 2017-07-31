import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  discussion: belongsTo('discussion'),
  content: attr(),
  discussionId: attr(),
  downvotesCount: attr(),
  upvotesCount: attr(),
  voteAction: attr(),
  upvote: memberAction({ path: 'upvote' }),
  downvote: memberAction({ path: 'downvote' }),
  markCorrect: memberAction({ path: 'mark_correct' }),
  user: attr(),
  created_at: attr()
});
