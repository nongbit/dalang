import { computePosition, flip, autoUpdate } from '@floating-ui/dom'

export default class Dropdown {
  constructor(el) { this.#init(el) }

  #init(el) {
    this.component = el
    this.toggleButton = el.querySelector('[data-toggle=dropdown]')
    this.content = el.querySelector('.dropdown-content')

    this.#reset()
    this.#event()
  }

  #reset() {
    this.#toggle(this.component.hasAttribute('open'))
  }

  #event() {
    this.toggleButton?.addEventListener('click', (e) => {
      e.stopPropagation()
      this.#toggle(!this.component.hasAttribute('open'))
    })

    window.addEventListener('click', (e) => {
      if (!(e.target.contains(this.content) && e.target === this.toggleButton)) this.#toggle()
    })
  }

  #toggle(open = false) {
    const updatePosition = () => computePosition(this.toggleButton, this.content, {
      placement: ('placement' in this.content.dataset) ? this.content.dataset.placement : ((this.component.parentElement.closest('.dropdown-content') === null) ? 'bottom-start' : 'right-start'),
      middleware: [flip()]
    }).then(({ x, y}) => {
      Object.assign(this.content.style, {
        left: `${x}px`,
        top: `${y}px`
      })
    })

    const cleanupPosition = autoUpdate(this.toggleButton, this.content, updatePosition)

    if (open) {
      this.component.setAttribute('open', '')
      updatePosition()
    } else {
      this.component.removeAttribute('open')
      cleanupPosition()
    }
  }
}