import {
  customElement,
  bindable
  // ,
  // bindingMode
} from 'aurelia-framework'

@customElement('at-menu')
export class Menu {
  @bindable navigation
  @bindable open = false

  // toggle () {
  //   this.open =
  // }
}
