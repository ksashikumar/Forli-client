import Ember from 'ember';

const {
  String: {
    htmlSafe
  },
  Helper: {
    helper
  }
} = Ember;

export function HtmlSafe(params) {
  return htmlSafe(params);
}

export default helper(HtmlSafe);
