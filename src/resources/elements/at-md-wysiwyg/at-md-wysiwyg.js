import {
  customElement,
  bindable,
  bindingMode
} from 'aurelia-framework'
import SimpleMDE from 'simplemde'

@customElement('at-md-wysiwyg')
export class MdWysiwyg {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) content
  @bindable({ defaultBindingMode: bindingMode.twoWay }) refresh

  refreshChanged (newValue, oldValue) {
    if (newValue || oldValue) {
      this.simplemde.value(this.content)
    }
  }

  attached () {
    this.simplemde = new SimpleMDE({
      element: this.wysiwygElem,
      autoDownloadFontAwesome: false,
      forceSync: true,
      spellChecker: false
    })
    this.simplemde.codemirror.on('change', () => {
      this.content = this.simplemde.value()
    })
  }
}
