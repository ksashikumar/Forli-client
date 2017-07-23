import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  content: attr(),
  answerId: attr(),
  createdAt: attr(),
  user: attr()
});
