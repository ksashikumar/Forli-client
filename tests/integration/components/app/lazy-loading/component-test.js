import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app/lazy-loading', 'Integration | Component | app/lazy loading', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{app/lazy-loading}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#app/lazy-loading}}
      template block text
    {{/app/lazy-loading}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
