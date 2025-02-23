module.exports = {
    presets: [
      '@babel/preset-env', // For ES6+ support
      '@babel/preset-typescript', // For TypeScript support
      [
        '@babel/preset-react', // For React JSX support
        { "runtime": "automatic" } // For React 17 JSX support
      ]
      
    ],
  };
  