import {WebAPI} from '../web-api'

export class Post {
  static inject () { return [WebAPI] }
  post
  loading = false
  refresh = false

  initPanelResizer () {
    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    var leftLimit = 1
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
    console.log('constructor')
    this.api = api
  }

  attached () {
    console.log('attached')
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
