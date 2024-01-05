export default class Slidedown {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.toggleButton = el.querySelector('[data-toggle=slidedown]')
    this.content = el.querySelector('.slidedown-content')

    this.#reset()
    this.#event()
  }

  #reset() {
    this.#toggle(this.component.hasAttribute('open'))
  }

  #event() {
    this.toggleButton?.addEventListener('click', () => {
      this.#toggle(!this.component.hasAttribute('open'))
    })
  }

  #toggle(open = false) {
    if (open) {
      this.component.setAttribute('open', '')
      this.content.style.height = `${this.content.scrollHeight}px`
    } else {
      this.component.removeAttribute('open')
      this.content.style.height = 0
    }
  }
}