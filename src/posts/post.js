import {WebAPI} from '../web-api'

export class Post {
  static inject () { return [WebAPI] }
  post
  loading = false
  refresh = false

  initPanelResizer () {
    var leftLimit = 10
    var rightLimit = 90

    this.paneSep.sdrag((el, pageX, startX, pageY, startY, fix) => {
      fix.skipX = true
      if (pageX < window.innerWidth * leftLimit / 100) {
        pageX = window.innerWidth * leftLimit / 100
        fix.pageX = pageX
      }
      if (pageX > window.innerWidth * rightLimit / 100) {
        pageX = window.innerWidth * rightLimit / 100
        fix.pageX = pageX
      }
      var cur = pageX / window.innerWidth * 100
      if (cur < 0) {
        cur = 0
      }
      if (cur > window.innerWidth) {
        cur = window.innerWidth
      }
      var right = (100 - cur - 2)
      this.editorPane.style.width = cur + '%'
      this.previewPane.style.width = right + '%'
    }, null, 'horizontal')
  }

  constructor (api) {
    this.api = api
  }

  attached () {
    this.initPanelResizer()
  }

  activate (params, routeConfig) {
    this.routeConfig = routeConfig
    this.loading = true
    return this.api.getPost(params.name).then(post => {
      this.post = post
      this.routeConfig.navModel.setTitle(post.title)
      this.loading = false
    })
  }

  save () {
    this.loading = true
    return this.api.savePost(this.post).then(post => {
      this.post = post
      this.refresh = !this.refresh
      this.loading = false
    })
  }
}
