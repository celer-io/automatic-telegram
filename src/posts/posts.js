import {WebAPI} from '../web-api'

export class Posts {
  static inject () { return [WebAPI] }
  posts = []

  constructor (api) {
    this.api = api
  }

  created () {
    this.api.getPosts().then(posts => {
      this.posts = posts
    })
  }
}
