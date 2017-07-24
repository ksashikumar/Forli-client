import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { collectionAction } from 'ember-api-actions';

export default Model.extend({
  id: attr('string'),
  name: attr('string'),
  passwordConfirmation: attr('string'),
  email: attr('string'),
  password: attr('string'),
  signIn: collectionAction({
    path: 'sign_in',
    type: 'POST'
  }),
  signOut: collectionAction({
    path: 'sign_out',
    type: 'DELETE'
  })
});
