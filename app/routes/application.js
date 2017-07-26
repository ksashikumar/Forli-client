import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const {
  Route,
} = Ember;

const { service } = Ember.inject;

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service('current-user'),
  session: service('session'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
   this._loadCurrentUser().then(()=>{
      this.transitionTo('/');
    }).catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('currentUser').loadCurrentUser();
  }
});
