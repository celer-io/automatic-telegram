import {
  customElement,
  bindable,
  bindingMode
} from 'aurelia-framework'

@customElement('at-pane-resizer')
export class PaneResizer {
  @bindable mode
  @bindable({ defaultBindingMode: bindingMode.twoWay }) panes

  attached () {
    setTimeout(() => {
      this.initPanelResizer()
    }, 10)
  }

  modeChanged (newValue, oldValue) {
    console.debug('newValue :', newValue)
    if (this.panes) {
      switch (oldValue) {
        case oldValue = 'max':
          this.panes.leftPane.style.display = 'block'
          break
        case oldValue = 'min':
          this.panes.rightPane.style.display = 'block'
          break
      }

      switch (newValue) {
        case newValue = 'max':
          this.panes.leftPane.style.display = 'none'
          this.panes.rightPane.style.width = '100%'
          break
        case newValue = 'min':
          this.panes.rightPane.style.display = 'none'
          this.panes.leftPane.style.width = '100%'
          break
        case newValue = 'wide':
          this.requestFullScreen(this.panes.rightPane)
          break
        case newValue = 'one_third':
          this.panes.rightPane.style.width = '33%'
          break
        default :
          this.panes.leftPane.style.display = 'block'
          this.panes.rightPane.style.display = 'block'
          break
      }
    }
  }

  initPanelResizer () {
    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    const paneMinWidth = 250
    const menuWidth = 0
    const leftLimit = paneMinWidth + menuWidth
    const rightLimit = Math.abs(paneMinWidth - window.innerWidth)
    this.panes.separator.sdrag((el, pageX, startX, pageY, startY, fix) => {
      fix.skipX = true
      console.log('rightLimit :', rightLimit)
      console.log('leftLimit :', leftLimit)
      console.log('pageX :', pageX)
      if (pageX <= leftLimit) {
        pageX = leftLimit
        fix.pageX = pageX
        this.mode = 'max'
      } else if (pageX >= rightLimit) {
        pageX = rightLimit
        fix.pageX = pageX
        this.mode = 'min'
      } else {
        this.mode = null
      }
      var cur = pageX / window.innerWidth * 100
      if (cur < 0) {
        cur = 0
      }
      if (cur > window.innerWidth) {
        cur = window.innerWidth
      }
      var right = (100 - cur - 2)
      this.panes.leftPane.style.width = cur + '%'
      this.panes.rightPane.style.width = right + '%'
    }, null, 'horizontal')
  }

  requestFullScreen (element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen

    if (requestMethod) { // Native full screen.
      requestMethod.call(element)
      console.log('requestMethod :', requestMethod)
    } else if (typeof window.ActiveXObject !== 'undefined') { // Older IE.
      var wscript = new ActiveXObject('WScript.Shell') // eslint-disable-line
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  }
}
