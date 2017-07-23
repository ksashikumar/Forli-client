import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';
import { collectionAction } from 'ember-api-actions';

export default DS.Model.extend({
  type: attr(),
  value: attr(),

  getVolumeTrends: collectionAction({
    path: 'volume_trends',
    type: 'PUT'
  })
});
