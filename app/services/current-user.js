import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service('store'),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('session.isAuthenticated')) {
        return this.get('store').findRecord('user', 'me').then((user) => {
          this.set('user', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});


