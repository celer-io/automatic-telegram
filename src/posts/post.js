import {WebAPI} from '../web-api'

export class Post {
  static inject () { return [WebAPI] }
  post
  loading = false
  refresh = false

  constructor (api) {
    this.api = api
  }

  activate (params, routeConfig) {
    this.routeConfig = routeConfig
    this.loading = true
    // console.log('this.routeConfig :', this.routeConfig)
    return this.api.getPost(params.name).then(post => {
      this.post = post
      this.routeConfig.navModel.setTitle(post.title)
      this.loading = false
    })
  }

  save () {
    this.loading = true
    console.log('first this.post.content :', this.post.content)
    return this.api.savePost(this.post).then(post => {
      this.post = post
      console.log('then this.post.content :', this.post.content)
      this.refresh = !this.refresh
      this.loading = false
    })
  }
}
