import Ember from 'ember';
import PerformSearchMixin from 'forli/mixins/perform-search';
import { module, test } from 'qunit';

module('Unit | Mixin | perform search');

// Replace this with your real tests.
test('it works', function(assert) {
  let PerformSearchObject = Ember.Object.extend(PerformSearchMixin);
  let subject = PerformSearchObject.create();
  assert.ok(subject);
});
