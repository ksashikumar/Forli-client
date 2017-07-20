import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  user: attr(),
  tags: attr(),
  categoryId: attr()
});
