import Ember from 'ember';
import performSearch from 'forli/mixins/perform-search';
import { task, timeout } from 'ember-concurrency';
import searchConstant from 'forli/constants/search';

const {
  get,
  Component,
  computed
} = Ember;

export default Component.extend(performSearch, {
  term: '',
  isTermPresent: computed.gt('term.length', 1),
  showLinkToPage: computed.gt('searchResults.lastSuccessful.value.meta.count', searchConstant.searchLimit),
  searchResults: task(function* () {
    if(get(this, 'isTermPresent')) {
      yield timeout(searchConstant.debounceTime);
      let result = yield this.performSearch({ term: this.get('term') });
      return result;
    }
  }).restartable()
});
