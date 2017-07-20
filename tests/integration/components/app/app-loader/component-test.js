import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app/app-loader', 'Integration | Component | app/app loader', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{app/app-loader}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#app/app-loader}}
      template block text
    {{/app/app-loader}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
