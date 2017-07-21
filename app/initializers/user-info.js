export function initialize(application) {
  [
    'component',
    'controller',
    'model',
    'route',
    'adapter'
  ].forEach((type) => {
    application.inject(type, 'userInfo', 'service:user-info');
  });
}

export default {
  name: 'userInfo',
  initialize
};
