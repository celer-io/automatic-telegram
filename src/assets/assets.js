// import {Resizer} from '../resources/elements/pane-resizer/resizer'

export class Assets {
  constructor () {
    this.message = 'Assets'
    this.menu = [
      {
        color: 'success',
        name: 'Sauvegarder',
        icon: 'save',
        callback: this.save
      },
      {
        color: 'info',
        name: 'Generer',
        icon: 'cog',
        callback: this.generate
      }
    ]
  }

  attached () {
    this.panes = {
      rightPane: this.rightPane,
      leftPane: this.leftPane,
      separator: this.separator
    }
    // this.preview = window.open('toto', 'toto')
    // console.log('this.preview :', this.preview)
    // this.resizer = new Resizer(this.separator, this.leftPane, this.rightPane)
  }

  previewUrl = 'assets'

  goToPreview () {
    console.log('this.preview :', this.preview)
    if (this.preview) {
      this.preview.location.assign(this.previewUrl)
      this.preview.focus()
    } else {
      this.preview = window.open(this.previewUrl)
    }
  }

  generate () {
    if (this.preview) {
      this.preview.focus()
    } else {
      this.preview = window.open('posts')
    }
  }

  save () {
    this.preview.location.assign('posts')
  }
}
