import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('ask');
  this.route('discussion', { path: '/d/:discussion_id' });
  this.route('tag-list');
  this.route('search');
  this.route('login');
});

export default Router;
