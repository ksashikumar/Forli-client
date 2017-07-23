import Ember from 'ember';
import performSearch from 'forli/mixins/perform-search';

const {
 Route,
 RSVP
} = Ember;

export default Route.extend(performSearch, {
  queryParams: {
    term: { refreshModel: true },
    page: { refreshModel: true },
    limit: { refreshModel: true },
  },
  model(params) {
    return RSVP.hash({
      params,
      searchResults: this.performSearch(params)
    });
  }
});
