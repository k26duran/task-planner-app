importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.js',
       '/components/NavigationDrawer.js',
       '/components/NavigationDrawer.css',
       '/components/Todo.js',
       '/components/Todo.css',
       '/components/TodoApp.js',
       '/components/TodoApp.css',
       '/components/TodoList.js',
       '/App.js',
       '/App.css'
     ]);
   })
 );
});