import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:devise',
  host: 'https://forli-api.herokuapp.com',
  // host: 'http://localhost:3000',
  namespace: "api/v1"
});
