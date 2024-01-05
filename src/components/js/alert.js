export default class Alert {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.dismissButton = el.querySelector('[data-dismiss=alert]')
    this.options = {
      timer: ('timer' in el.dataset) && (!isNaN(el.dataset.timer) && parseInt(el.dataset.timer) > 0) ? el.dataset.timer : false,
    }

    if (this.options.timer !== false) setTimeout(() => { this.#dismiss() }, this.options.timer)

    this.#event()
  }

  #event() {
    this.dismissButton?.addEventListener('click', () => {
      this.#dismiss()
    })

    this.component.addEventListener('transitionend', () => {
      this.#remove()
    })
  }

  #dismiss() {
    this.component.setAttribute('dismiss', '')
  }

  #remove() {
    this.component.remove()
  }
}