export default class Modal {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.openButton = document.querySelector(`[data-open=modal][data-target=${el.id}]`)
    this.states = {
      bodyOverflowY: window.getComputedStyle(document.body).overflowY,
    }
    this.options = {
      bodyScroll: ('bodyScroll' in el.dataset) && (el.dataset.bodyScroll.trim().toLowerCase() === 'true'),
      clickableBackdrop: ('clickableBackdrop' in el.dataset) && (el.dataset.clickableBackdrop.trim().toLowerCase() === 'true'),
    }

    this.#event()
  }

  #event() {
    this.openButton?.addEventListener('click', () => {
      this.#open()
    })

    this.component.addEventListener('close', () => {
      this.#resetBody()
    })
  }

  #open() {
    this.component.showModal()

    if (!this.options.bodyScroll) document.body.style.overflowY = 'hidden'

    if (this.options.clickableBackdrop) {
      window.addEventListener('click', (e) => {
        if (e.target.contains(this.component)) this.component.close()
      })
    }
  }

  #resetBody() {
    document.body.style.overflowY = this.states.bodyOverflowY
  }
}