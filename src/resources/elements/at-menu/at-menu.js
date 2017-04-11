import {
  customElement,
  bindable
} from 'aurelia-framework'

@customElement('at-menu')
export class Menu {
  @bindable navigation
  @bindable open = false
}
