export function initialize(application) {
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
  name: 'forli',
  initialize
};
