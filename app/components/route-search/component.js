import Ember from 'ember';

const {
  Component,
  computed,
  get,
  run,
  isEmpty
} = Ember;

export default Component.extend({
  showResultsCheck: computed.and('resultsPresent', 'termPresent', 'pageMaxBound'),
  pageMaxBound: computed('searchResults.meta.count', function() {
    return get(this, 'page') <= Math.ceil(this.get('searchResults.meta.count') / this.get('perPage'));
  }),
  resultsPresent: computed.bool('searchResults.meta.count'),
  // Adding isLoading to prevent the jank in the UI due to the debounce timing
  isLoading: computed('term', 'limit', 'page', {
    get() {
      if (get(this, 'termPresent')) {
        return true;
      }
    },
    set(key, value) {
      return value;
    }
  }),
  term: computed.reads('searchParams.term'),
  page: computed('searchParams.page', {
    get() {
      return parseInt(get(this, 'searchParams.page') || 1);
    },
    set(key, value) {
      return value;
    }
  }),
  limit: computed('searchParams.limit', {
    get() {
      return get(this, 'searchParams.limit')
        || 10;
    },
    set(key, value) {
      return value;
    }
  }),
  termPresent: computed.gt('term.length', 1),
  pagePresent: computed.gt('page', 1),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isLoading', false);
  },
  setSearchRoute(persistPage = false) {
    let router = get(this, 'router');
    let term = get(this, 'term');
    let page = get(this, 'pagePresent') && persistPage ? get(this, 'page') : undefined;
    let limit = get(this, 'limit');
    let queryParams = {
      term: isEmpty(term) ? undefined : term,
      page,
      limit
    };
    if (JSON.stringify(queryParams) === JSON.stringify(get(this, 'searchParams'))) {
      router.refresh();
    } else {
      router.transitionTo({
        queryParams
      });
    }
  },

  actions: {
    searchOnEnter() {
      this.setSearchRoute();
    },
    setSearchPage() {
      this.setSearchRoute(true);
    },
    setSearchLimit() {
      this.setSearchRoute(true);
    },
    debouncedSearch() {
      run.debounce(this, this.setSearchRoute, 1000);
    }
  }
});