module.exports = {
  'presets': ['react-app'],
  'plugins': ['transform-class-properties'],
  'env'    : {
    'production': {
      'plugins': [
        ['react-remove-properties', { 'properties': ['data-testid'] }]
      ]
    }
  }
};
