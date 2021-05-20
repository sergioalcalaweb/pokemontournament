const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise

  
  return workboxBuild.generateSW({    
    cacheId:'PokemonCU',    
    globDirectory: 'build',
    globPatterns: [
      '**/*.{html,json,js,css}',
    ],
    swDest: 'build/service-worker.js',
    // Define runtime caching rules.
    runtimeCaching: [
      {
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        // Apply a cache-first strategy.
        handler: 'CacheFirst',
        options: {
          // Use a custom cache name.
          cacheName: 'images',
          // Only cache 10 images.
          // expiration: {
          //   maxEntries: 10,
          // },
        },
      },
      {
        urlPattern: new RegExp('https://robohash.org/.*'),
        handler: 'CacheFirst',
      }
    ],
    navigateFallback: '/index.html',
  });
};

buildSW();