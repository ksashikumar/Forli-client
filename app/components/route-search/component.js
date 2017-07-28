import Ember from 'ember';

const {
  Component,
  computed,
  get,
  run
} = Ember;

export default Component.extend({
  showResultsCheck: computed.and('resultsPresent', 'termPresent'),
  resultsPresent: computed.bool('searchResults.discussions.length'),
  loadedCount: computed('page', 'limit', function() {
    return get(this, 'page') * get(this, 'limit');
  }),
  totalCount: computed.reads('searchResults.meta.count'),
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
  termPresent: computed.gt('term.length', 0),
  pagePresent: computed.gt('page', 1),
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isLoading', false);
  },
  setSearchRoute(persistPage = false) {
    let router = get(this, 'router');
    let term = get(this, 'term');
    let page = (get(this, 'pagePresent') && persistPage ? get(this, 'page') : 1).toString();
    // let limit = get(this, 'limit');
    let queryParams = {
      term,
      // limit,
      page
    };
    if (JSON.stringify(queryParams) === JSON.stringify(get(this, 'searchParams'))) {
      router._routerMicrolib.refresh();
    } else {
      router.transitionTo('search', {
        queryParams
      });
    }
  },

  actions: {
    searchOnEnter() {
      this.setSearchRoute();
    },
    setSearchPage() {
      this.set('page', (this.get('page')+1));
      this.setSearchRoute(true);
    },
    setSearchLimit() {
      this.setSearchRoute(true);
    },
    debouncedSearch() {
      this.set('isLoading', true);
      run.debounce(this, this.setSearchRoute, 1000);
    }
  }
});
