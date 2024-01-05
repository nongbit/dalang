import { getDefaultActive } from '../../helper'

export default class Accordion {
  constructor(el) {this.#init(el) }

  #init(el) {
    this.component = el
    this.toggleButtons = el.querySelectorAll('[data-toggle=accordion]')
    this.contents = el.querySelectorAll('.accordion-content')
    this.options = {
      flush: ('flush' in el.dataset) && (el.dataset.flush.trim().toLowerCase() === 'true')
    }

    this.#reset()
    this.#event()
  }

  #reset() {
    const index = getDefaultActive(this.toggleButtons)

    this.#flush(index)
    if (index !== null) this.#toggleItem(index, true)
  }

  #event() {
    this.toggleButtons.forEach((toggleButton, index) => {
      toggleButton.addEventListener('click', () => {
        if (this.options.flush) this.#flush(index)

        this.#toggleItem(index, !toggleButton.hasAttribute('active'))
      })
    })
  }

  #flush(exclude = null) {
    this.toggleButtons.forEach((x, index) => {
      if (index !== exclude) this.#toggleItem(index)
    })
  }

  #toggleItem(index, show = false) {
    if (show) {
      this.toggleButtons[index].setAttribute('active', '')
      this.contents[index].setAttribute('open', '')
      this.contents[index].style.height = `${this.contents[index].scrollHeight}px`
    } else {
      this.toggleButtons[index].removeAttribute('active')
      this.contents[index].removeAttribute('open')
      this.contents[index].style.height = 0
    }
  }
}