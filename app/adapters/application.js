import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  host: 'https://forli-api.herokuapp.com',
  // host: 'http://localhost:4000',
  namespace: "api/v1",
  // headers: {
  //   'API_KEY': 'secret key',
  //   'ANOTHER_HEADER': 'Some header value'
  // }
});
