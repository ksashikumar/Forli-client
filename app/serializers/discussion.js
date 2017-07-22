import ApplicationSerializer from './application';
import DS from 'ember-data';

const { EmbeddedRecordsMixin } = DS;

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    tags: { deserialize: 'records' }
  }
  // },
  // normalize(model, hash) {
  //   debugger;
  //   if (hash.hasOwnProperty('tags')) {
  //     hash.tags = hash.tags;
  //   }
  //   return this._super(...arguments);
  // }
});
