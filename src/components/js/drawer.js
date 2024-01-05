export default class Drawer {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.toggleButtons = document.querySelectorAll(`[data-toggle=drawer][data-target=${el.id}]`)
    this.dismissButton = el.querySelector('[data-dismiss=drawer]')
    this.backdrop = document.querySelector('.drawer-backdrop')
    this.options = {
      breakpoint: ('breakpoint' in el.dataset) && (!isNaN(el.dataset.breakpoint) && parseInt(el.dataset.breakpoint) > 0) ? el.dataset.breakpoint : 1024,
    }

    this.#reset()
    this.#event()
  }

  #reset() {
    this.#toggle()
  }

  #event() {
    this.toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener('click', () => {
        this.#toggle(!this.component.hasAttribute('open'))
      })
    })

    this.dismissButton?.addEventListener('click', () => {
      this.#toggle(false)
    })

    window.addEventListener('resize', () => {
      this.#toggle()
    })
  }

  #toggle(open = window.innerWidth >= this.options.breakpoint) {
    this.component.removeAttribute('open')
    this.backdrop?.remove()

    if (open) {
      this.component.setAttribute('open', '')

      if (window.innerWidth < this.options.breakpoint) {
        this.backdrop = document.createElement('div')
        this.component.after(this.backdrop)
        this.backdrop.classList.add('drawer-backdrop')

        this.backdrop.addEventListener('click', () => {
          this.#toggle(false)
        })
      }
    }
  }
}