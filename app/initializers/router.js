export function initialize(application) {
  application.inject('route', 'router', 'router:main');
  application.inject('component', 'router', 'router:main');
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
