module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/en',
      ],
      startServerCommand: 'npm run build && npm start',
      startServerReadyPattern: /started server/i,
      startServerReadyTimeout: 120000,
      numberOfRuns: 1,
    },
    upload: {
      target: 'temporary-public-storage', // set to 'filesystem' for HTML locally
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.75 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
};
