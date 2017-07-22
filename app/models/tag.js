import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';

const {
  computed
} = Ember;

export default DS.Model.extend({
  createdAt: attr(),
  updatedAt: attr(),
  name: attr(),
  color: computed('id', function() {
    let id = this.get('id');
    return (id%10).toString();
  }),
});
