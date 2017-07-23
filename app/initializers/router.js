import Forli from '../forli'
import Cookies from 'ember-cli-js-cookie';
import Ember from 'ember';

const { $ } = Ember;

export function initialize(application) {
  application.inject('route', 'router', 'router:main');
  application.inject('component', 'router', 'router:main');
  $.ajax({
    //url: 'http://localhost:3000/api/v1/bootstrap',
    url: 'https://forli-api.herokuapp.com/api/v1/bootstrap',
    async: false,
    dataType: 'json',
    headers: {
      'client': Cookies.get('client'),
      'access-token': Cookies.get('access-token'),
      'token-type': Cookies.get('token-type'),
      'expiry': Cookies.get('expiry'),
      'uid': Cookies.get('uid')
    },
    success(response, status, xhr) {
      Forli.setAppInfo(response);
      if (response.userSignedIn) {
        let headers = {
          'client': xhr.getResponseHeader('client'),
          'access-token': xhr.getResponseHeader('access-token'),
          'token-type': xhr.getResponseHeader('token-type'),
          'expiry': xhr.getResponseHeader('expiry'),
          'uid': xhr.getResponseHeader('uid')
        };
        Forli.setHeaders(headers);
      }
    },
    error(response) {
      alert(response);
    }
  });

  [
    'component',
    'controller',
    'model',
    'route',
    'adapter'
  ].forEach((type) => {
    application.inject(type, 'forli', 'service:forli');
  });
}

export default {
  name: 'router',
  initialize
};
