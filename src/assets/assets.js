// import {Resizer} from '../resources/elements/pane-resizer/resizer'
import {WebAPI} from '../web-api'

export class Assets {
  static inject () { return [WebAPI] }

  constructor (api) {
    this.api = api
    this.message = 'Assets'
  }

  attached () {
    this.panes = {
      rightPane: this.rightPane,
      leftPane: this.leftPane,
      separator: this.separator
    }
    this.paneMode = 'one_third'
  }

  activate (params, routeConfig) {
    console.log('routeConfig :', routeConfig)
  }
  previewUrl = '/'

  loadPreviewIfr () {
    console.log('this.rightPane :', this.rightPane.firstChild)
    // this.rightPane
  }

  loadPreviewExt () {
    if (this.preview) {
      this.preview.location.assign(this.previewUrl)
      this.preview.focus()
    } else {
      this.preview = window.open(this.previewUrl)
    }
  }

  generate (api) {
    this.loading = true
    return this.api.generate().then(res => {
      console.log('res :', res)
      this.loading = false
    })
  }

  save () {
    this.loading = true
    return this.api.save(this.post).then(res => {
      console.log('res :', res)
      this.loading = false
    })
  }
}
