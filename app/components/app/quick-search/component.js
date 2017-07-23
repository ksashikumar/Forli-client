import Ember from 'ember';
import performSearch from 'forli/mixins/perform-search';
import { task, timeout } from 'ember-concurrency';

const {
  get,
  Component,
  computed
} = Ember;
export default Component.extend(performSearch, {
  term: '',
  isTermPresent: computed.gt('term.length', 1),
  isLoading: computed.reads('searchResults.isPending'),
  searchResults: task(function* () {
    if(get(this, 'isTermPresent')) {
      yield timeout(500);
      let result = yield this.performSearch({ term: this.get('term') });
      return result;
    }
  }).restartable()
});
