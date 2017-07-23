import Ember from 'ember';

const { isEmpty, typeOf } = Ember;

export default function underscoreToCamelcase(jsonResponse) {
  return JSON.parse(JSON.stringify(jsonResponse, (key, value) => {
    if (!isEmpty(value) && typeOf(value) === 'object') {
      let replacement = {};
      for (let k in value) {
        if (Object.hasOwnProperty.call(value, k)) {

          replacement[k.camelize()] = value[k];
        }
      }
      return replacement;
    }
    return value;
  }));
}
