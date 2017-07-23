import Ember from 'ember';
import performSearch from 'forli/mixins/perform-search';
import { task, timeout } from 'ember-concurrency';
import searchConstant from 'forli/constants/search';

const {
  Component,
  computed,
  $
} = Ember;

export default Component.extend(performSearch, {
  term: '',
  showResultsDropdown: true,
  isTermPresent: computed.gt('term.length', 0),
  showLinkToPage: computed.gt('searchResults.lastSuccessful.value.meta.count', searchConstant.searchLimit),
  searchResults: task(function* () {
    yield timeout(searchConstant.debounceTime);
    let result = yield this.performSearch({ term: this.get('term') });
    return result;
  }).restartable(),
  click(event) {
    if ($(event.target).is('a, input')) {
      this.toggleProperty('showResultsDropdown');
      this.set('term', '');
    }
  },
  didInsertElement() {
    document.querySelector('#quick-search-input').focus();
    this._super(...arguments);
  }
});
