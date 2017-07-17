import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function truncate(params/* , hash*/) {
  let [theString] = params;
  if (!theString) {
    return '- -';
  }
  if (theString.length > params[1])    {
    theString = theString.substring(0, params[1]);
    theString = params[2] ? `${theString}...` : theString;
  }
  return theString;
}

export default helper(truncate);
