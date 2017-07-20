import { ActiveModelSerializer } from 'active-model-adapter';
import Ember from 'ember';

const { merge } = Ember;

export default ActiveModelSerializer.extend({
  // NOTE: Since some of the Id's need not to be an Integer.
  // Those keys are maintained in excludeList
  excludeList: ['twitter_id'],
  serialize() {
    let json = this._super(...arguments);

    this._typeNormalizeJson(json);
    return json;
  },
  _typeNormalizeJson(json) {
    let excludeList = this.get('excludeList');
    Object.keys(json).forEach((k) => {
      let v = json[k];
      if (!excludeList.includes(k) && (k.endsWith('_id') || k.endsWith('_ids')) && v && v !== 'null') {
        json[k] = this._typeNormalize(v);
      }
    });
  },

  _typeNormalize(value) {
    if (value instanceof Array) {
      return value.map((item) => {
        return parseInt(item);
      });
    } else {
      return parseInt(value);
    }
  },

  serializeAttribute(snapshot, json, key, attribute) {
    // do not serialize the attribute!
    if (this._shouldSerialize(snapshot, key, attribute)) {
      this._super(...arguments);
    }
  },
  serializeBelongsTo(snapshot, json, relationship) {
    if (this._shouldSerialize(snapshot, relationship.key, relationship)) {
      this._super(...arguments);
    }
  },
  serializeHasMany(snapshot, json, relationship) {
    if (this._shouldSerialize(snapshot, relationship.key, relationship)) {
      this._super(...arguments);
    }
  },
  // We can now set a property 'readOnly' within the model Attribute
  // itself to ignore its content when sending back to the create or update API
  _shouldSerialize(snapshot, key, item) {
    return (snapshot.changedAttributes()[key] && !(item.options && item.options.readOnly));
  },
  serializeIntoHash(hash, type, record, options) {
    merge(hash, this.serialize(record, options));
  }
});
