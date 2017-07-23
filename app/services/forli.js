import Forli from '../forli';
import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

const { Service } = Ember;

export default Service.extend({
  headerKeys: ['client', 'access-token', 'token-type', 'expiry', 'uid'],
  showLoginDialog: false,
  userLoggedIn: false,
  headers: null,
  userName: null,
  searchEnabled: false,
  init() {
    this.appInfo = Forli.getAppInfo();
    this.headers = Forli.getHeaders();
    this.set('userLoggedIn', this.appInfo.userSignedIn);
  },
  setHeaders(responseHeaders) {
    let headers = {};
    this.get('headerKeys').forEach((headerKey) => {
      if(responseHeaders[headerKey]) {
        headers[headerKey] = responseHeaders[headerKey];
        Cookies.set(headerKey, responseHeaders[headerKey]);
      }
    });
    this.set('headers', headers);
  }
});
