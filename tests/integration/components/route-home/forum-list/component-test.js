import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('route-home/forum-list', 'Integration | Component | route home/forum list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{route-home/forum-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#route-home/forum-list}}
      template block text
    {{/route-home/forum-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
