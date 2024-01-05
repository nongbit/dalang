import { getDefaultActive } from '../../helper'

export default class Tab {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.toggleButtons = el.querySelectorAll('[data-toggle=tab]')
    this.contents = el.querySelectorAll('.tab-content')

    this.#reset()
    this.#event()
  }

  #reset() {
    const index = getDefaultActive(this.toggleButtons, 0)

    this.#flush(index)
    this.#toggleItem(index)
  }

  #event() {
    this.toggleButtons.forEach((toggleButton, index) => {
      toggleButton.addEventListener('click', () => {
        this.#flush(index)
        this.#toggleItem(index)
      })
    })
  }

  #flush(exclude = 0) {
    this.toggleButtons.forEach((x, index) => {
      if (index !== exclude) {
        this.toggleButtons[index].removeAttribute('active')
        this.contents[index].removeAttribute('open')
      }
    })
  }

  #toggleItem(index) {
    this.toggleButtons[index].setAttribute('active', '')
    this.contents[index].setAttribute('open', '')
  }
}