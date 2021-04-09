module.exports = {
  'presets': ['react-app'],
  'env'    : {
    'production': {
      'plugins': [
        '@babel/plugin-proposal-object-rest-spread',
        ['react-remove-properties', { 'properties': ['data-testid'] }]
      ]
    }
  },
  'plugins': ['@babel/plugin-proposal-object-rest-spread']
};
