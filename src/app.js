import {RouterConfiguration, Router} from 'aurelia-router' // eslint-disable-line

export class App {
  constructor () {
    this.message = 'Hello World!'
  }

  configureRouter (config, router) {
    this.router = router
    config.title = 'Automatac telegram'
    config.options.pushState = true
    config.options.root = '/'
    config.map([
      {
        settings: {icon: 'home'},
        route: ['', 'index.html'],
        title: 'Dashboard',
        moduleId: 'dashboard/dashboard',
        nav: 0
      },
      {
        settings: {icon: 'file'},
        route: 'pages',
        title: 'Pages',
        moduleId: 'pages/pages',
        nav: 1
      },
      {
        settings: {icon: 'file-text'},
        route: 'posts',
        title: 'Posts',
        moduleId: 'posts/posts',
        nav: 2
      },
      {
        settings: {icon: 'picture-o'},
        route: 'assets',
        title: 'Medias',
        moduleId: 'assets/assets',
        nav: 3
      },
      {
        settings: {icon: 'paper-plane'},
        route: 'publish',
        title: 'Publication',
        moduleId: 'publish/publish',
        nav: 4
      },
      {
        route: 'pages/:name',
        moduleId: 'pages/page'
      },
      {
        route: 'posts/:name',
        moduleId: 'posts/post'
      },
      {
        route: 'assets/:name',
        moduleId: 'assets/asset'
      }
    ])
  }
}
